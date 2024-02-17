import { removeUploadthingURLPrefix, utapi } from "@/app/api/uploadthing/core";
import { createTRPCRouter, userProcedure } from "@/server/api/trpc";
import { unconfirmedUserProfileImage, user } from "@/server/db/schema";
import { and, eq, ne } from "drizzle-orm";

export const profileRouter = createTRPCRouter({
  confirmNewProfileImage: userProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session?.user?.userId) {
      throw new Error("User not found");
    }

    let oldProfile = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session?.user?.userId),
      columns: { id: true, profileImageURL: true },
    });

    await ctx.db.transaction(async (tx) => {
      const newProfile = await tx.query.unconfirmedUserProfileImage.findFirst({
        where: eq(
          unconfirmedUserProfileImage.userID,
          ctx.session?.user?.userId,
        ),
        orderBy: (img, { desc }) => [desc(img.id)],
      });

      if (!newProfile) {
        throw new Error("No new profile image found");
      }

      await tx
        .update(user)
        .set({
          profileImageURL: newProfile.imageURL,
        })
        .where(eq(user.id, ctx.session?.user?.userId));

      const outDatedUnconfirmedProfileImages =
        await tx.query.unconfirmedUserProfileImage.findMany({
          where: and(
            eq(unconfirmedUserProfileImage.userID, ctx.session?.user?.userId),
            ne(unconfirmedUserProfileImage.imageURL, newProfile.imageURL),
          ),
        });

      console.log(
        "outDatedUnconfirmedProfileImages",
        outDatedUnconfirmedProfileImages,
      );

      console.log("new profile", newProfile.imageURL);
      await utapi.deleteFiles(
        outDatedUnconfirmedProfileImages.map((img) =>
          removeUploadthingURLPrefix(img.imageURL),
        ),
      );

      await tx
        .delete(unconfirmedUserProfileImage)
        .where(
          eq(unconfirmedUserProfileImage.userID, ctx.session?.user?.userId),
        );
    });

    if (oldProfile?.profileImageURL && oldProfile.profileImageURL !== "") {
      await utapi.deleteFiles(
        removeUploadthingURLPrefix(oldProfile.profileImageURL),
      );
    }

    console.log("Profile image confirmed");
  }),

  confirmNewProfileImage: userProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session?.user?.userId) {
      throw new Error("User not found");
    }

    let oldProfile = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session?.user?.userId),
      columns: { id: true, profileImageURL: true },
    });

    await ctx.db.transaction(async (tx) => {
      const newProfile = await tx.query.unconfirmedUserProfileImage.findFirst({
        where: eq(
          unconfirmedUserProfileImage.userID,
          ctx.session?.user?.userId,
        ),
        orderBy: (img, { desc }) => [desc(img.id)],
      });

      if (!newProfile) {
        throw new Error("No new profile image found");
      }

      await tx
        .update(user)
        .set({
          profileImageURL: newProfile.imageURL,
        })
        .where(eq(user.id, ctx.session?.user?.userId));

      const outDatedUnconfirmedProfileImages =
        await tx.query.unconfirmedUserProfileImage.findMany({
          where: and(
            eq(unconfirmedUserProfileImage.userID, ctx.session?.user?.userId),
            ne(unconfirmedUserProfileImage.imageURL, newProfile.imageURL),
          ),
        });

      console.log(
        "outDatedUnconfirmedProfileImages",
        outDatedUnconfirmedProfileImages,
      );

      console.log("new profile", newProfile.imageURL);
      await utapi.deleteFiles(
        outDatedUnconfirmedProfileImages.map((img) =>
          removeUploadthingURLPrefix(img.imageURL),
        ),
      );

      await tx
        .delete(unconfirmedUserProfileImage)
        .where(
          eq(unconfirmedUserProfileImage.userID, ctx.session?.user?.userId),
        );
    });

    if (oldProfile?.profileImageURL && oldProfile.profileImageURL !== "") {
      await utapi.deleteFiles(
        removeUploadthingURLPrefix(oldProfile.profileImageURL),
      );
    }

    console.log("Profile image confirmed");
  }),
});
