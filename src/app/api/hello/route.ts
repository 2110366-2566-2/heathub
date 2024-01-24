import { NextResponse, type NextRequest } from "next/server";

export function GET(_req: NextRequest) {
  return NextResponse.json("Hello, world!");
}
