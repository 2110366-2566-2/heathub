import { removeUploadthingURLPrefix, utapi } from "@/app/api/uploadthing/core";
import {
  createTRPCRouter,
  hostProcedure,
  userProcedure,
} from "@/server/api/trpc";
import {
  hostInterest,
  hostUser,
  unconfirmedUserProfileImage,
  user,
  verifiedRequest,
} from "@/server/db/schema";
import { and, eq, ne, or, type SQL } from "drizzle-orm";
import { z } from "zod";

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
        return;
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

  updateProfile: userProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        bio: z.string().optional(),
        gender: z.string().optional(),
        email: z.string().optional(),
        aka: z.string().optional(),
        dateOfBirth: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let duplicateCheck: SQL<unknown>[] = [];
      if (input.email) {
        duplicateCheck.push(eq(user.email, input.email));
      }
      console.log("PASS!!");

      let found = await ctx.db.query.user.findFirst({
        where: and(or(...duplicateCheck), eq(user.id, ctx.session.user.userId)),
      });

      if (found && duplicateCheck.length > 0) {
        throw new Error("Duplicate email or aka");
      }

      await ctx.db
        .update(user)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          aka: input.aka,
          bio: input.bio,
          dateOfBirth: input.dateOfBirth,
          email: input.email,
          gender: input.gender,
        })
        .where(eq(user.id, ctx.session.user.userId));
    }),

  updateInterests: hostProcedure
    .input(
      z.object({
        interests: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .delete(hostInterest)
          .where(eq(hostInterest.userID, ctx.session.user.userId));

        const values = input.interests.map((v) => ({
          userID: ctx.session.user.userId,
          interest: v,
        }));

        await tx.insert(hostInterest).values(values);
      });
    }),

  balance: userProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.userId),
      columns: {
        balance: true,
      },
    });

    return res?.balance ?? 0;
  }),
  getHostVerifiedRequest: hostProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.verifiedRequest.findFirst({
      orderBy: (v, { desc }) => [desc(v.id)],
      where: eq(verifiedRequest.hostID, ctx.session.user.userId),
      columns: {
        id: true,
        nationalIDCardImageURL: true,
        status: true,
        requestDetails: true,
      },
    });
    console.log("res", res);
    return res;
  }),
});
