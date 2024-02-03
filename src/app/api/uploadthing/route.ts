import { createRouteHandler } from "uploadthing/next";

import { env } from "@/env";
import { uploadthingRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadthingRouter,
  config: {
    uploadthingId: env.UPLOADTHING_APP_ID,
    uploadthingSecret: env.UPLOADTHING_SECRET,
  },
});
