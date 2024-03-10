"use server";
import stripe from "@/server/stripe";
import { serverapi } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const priceSchema = z.coerce.number().int().positive();

export async function topUp(formData: FormData) {
  const reqHeader = headers();
  const origin = reqHeader.get("origin");
  if (!origin) {
    throw new Error("No host");
  }

  const user = await serverapi.auth.me.query();
  if (!user) {
    throw new Error("Unauthorized user");
  }
  const price = priceSchema.parse(formData.get("price"));

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    metadata: {
      userId: user.userId,
    },
    line_items: [
      {
        price_data: {
          currency: "thb",
          product_data: {
            name: "Top up",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    payment_method_types: ["card", "promptpay"],
    mode: "payment",
    success_url: `${origin}/api/stripe/topup?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/profile?topup=failed`,
  });

  if (!session.url) {
    throw new Error("No session URL");
  }
  redirect(session.url);
}
