"use server";

import { openApiDocument } from "@/server/api/openapi";

export async function GetSpec(): Promise<Record<string, any>> {
  return openApiDocument;
}
