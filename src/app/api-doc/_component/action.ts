"use server";

import { openApiDocument } from "@/server/api/openapi";

export async function GetSpec() {
  return openApiDocument;
}
