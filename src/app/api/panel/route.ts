import { appRouter } from "@/server/api/root";
import { NextResponse } from "next/server";
import { renderTrpcPanel } from "trpc-panel";

export async function GET(_req: Request) {
  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
      transformer: "superjson",
    }),
    {
      status: 200,
      headers: [["Content-Type", "text/html"] as [string, string]],
    },
  );
}
