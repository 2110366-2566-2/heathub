import { auth } from "@/server/api/auth";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

export const utapi = new UTApi();
const f = createUploadthing();

const UPLOADTHING_DOMAIN_PREFIX = "https://utfs.io/f/";

// FileRouter for your app, can contain multiple FileRoutes
export const uploadthingRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // const user = await auth(req);

      const authRequest = auth.handleRequest(req);
      const session = await authRequest.validate();

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      const userData = await db.query.user.findFirst({
        where: eq(user.id, metadata.userId),
        columns: { id: true, profileImageURL: true },
      });

      if (userData?.profileImageURL && userData.profileImageURL !== "") {
        await utapi.deleteFiles(
          userData.profileImageURL.replace(UPLOADTHING_DOMAIN_PREFIX, ""),
        );
      }

      const res = await db
        .update(user)
        .set({ profileImageURL: file.url })
        .where(eq(user.id, metadata.userId));

      console.log("res", res);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadthingRouter = typeof uploadthingRouter;
