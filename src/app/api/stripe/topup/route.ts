import { db } from "@/server/db";
import { externalTransaction, user } from "@/server/db/schema";
import stripe from "@/server/stripe";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const forwardHost = req.headers.get("x-forwarded-host");
    const forwardProto = req.headers.get("x-forwarded-proto");
    if (!forwardHost || !forwardProto) {
      return NextResponse.json({ error: "missing headers" }, { status: 400 });
    }

    const origin = `${forwardProto}://${forwardHost}`;

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.redirect(`${origin}/profile?topup=failed`);
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const userId = session.metadata?.userId;
    if (!userId) {
      return NextResponse.redirect(`${origin}/profile?topup=failed`);
    }

    await db.transaction(async (tx) => {
      if (!session.amount_total) {
        return NextResponse.redirect(`${origin}/profile?topup=failed`);
      }

      const data = await tx.query.externalTransaction.findFirst({
        where: eq(externalTransaction.sessionID, sessionId),
      });

      if (data) {
        return NextResponse.redirect(`${origin}/profile?topup=success`);
      }

      await tx.insert(externalTransaction).values({
        userID: userId,
        amount: session.amount_total,
        sessionID: sessionId,
        type: "topup",
      });

      await tx
        .update(user)
        .set({
          balance: sql`${user.balance} + ${session.amount_total}`,
        })
        .where(eq(user.id, userId));
    });

    return NextResponse.redirect(`${origin}/profile?topup=success`);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
