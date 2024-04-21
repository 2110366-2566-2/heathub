import { generateOpenApiDocument } from "trpc-swagger";

import { env } from "@/env";
import { appRouter } from "./root";

// Generate OpenAPI schema document

const url =
  env.NODE_ENV === "production"
    ? "https://heathub.vercel.com"
    : "http://localhost:3000";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "HeatHub API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: `${url}/api/v1`,
  docsUrl: `${url}/api/doc`,
});
