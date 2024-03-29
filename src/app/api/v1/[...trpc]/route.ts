import { NextRequest } from "next/server";
import { createOpenApiFetchHandler } from "trpc-swagger";
import { appRouter } from "../../../../server/api/root";
import { createContext } from "../../trpc/[trpc]/route";

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
