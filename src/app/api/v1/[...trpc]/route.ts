import { type NextRequest } from "next/server";
import { createOpenApiFetchHandler } from "trpc-swagger";
import { appRouter } from "../../../../server/api/root";

import * as context from "next/headers";
import { createTRPCContext } from "@/server/api/trpc";
import { auth } from "@/server/api/auth";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  return createTRPCContext({
    headers: req.headers,
    session: session,
  });
};

const handler = (req: NextRequest) => {
  // Handle incoming swagger/openapi requests
  return createOpenApiFetchHandler({
    req,
    endpoint: "/api/v1",
    router: appRouter,
    createContext: () => createContext(req),
  });
};

export { handler as GET, handler as POST };
