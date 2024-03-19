import { auth } from "@/server/api/auth";
import { db } from "@/server/db";
import {
  unconfirmedUserProfileImage,
  verifiedRequest,
} from "@/server/db/schema";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi, UploadThingError } from "uploadthing/server";

export const utapi = new UTApi();
const f = createUploadthing();

const UPLOADTHING_DOMAIN_PREFIX = "https://utfs.io/f/";

export function removeUploadthingURLPrefix(url: string) {
  return url.replace(UPLOADTHING_DOMAIN_PREFIX, "");
}

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

      await db.insert(unconfirmedUserProfileImage).values({
        userID: metadata.userId,
        imageURL: file.url,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  signupProfileUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({}) => {
      return {};
    })
    .onUploadComplete(async ({}) => {
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {};
    }),
  verifiedUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      const authRequest = auth.handleRequest(req);
      const session = await authRequest.validate();

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");
      if (session.user.role !== "host")
        throw new UploadThingError("Only hosts can upload");
      console.log("middleware");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for hostId:", metadata.userId);

      console.log("file url", file.url);

      await db.insert(verifiedRequest).values({
        hostID: metadata.userId,
        nationalIDCardImageURL: file.url,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadthingRouter = typeof uploadthingRouter;
