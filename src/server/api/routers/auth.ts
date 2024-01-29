import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  hostInterest,
  hostUser,
  participantUser,
  user,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.session?.user ?? null;
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.user.findMany();
    return users;
  }),

  getUserPublicData: publicProcedure
    .input(
      z.object({
        userID: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.userID),
        columns: {
          aka: true,
          bio: true,
          email: true,
          firstName: true,
          gender: true,
          role: true,
          lastName: true,
          profileImageURL: true,
        },
      });
      return res;
    }),

  signupPaticipate: publicProcedure
    .input(
      z.object({
        aka: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        gender: z.string().min(1),
        bio: z.string(),
        dateOfBirth: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.auth.createUser({
        key: {
          providerId: "email",
          providerUserId: input.email.toLowerCase(),
          password: input.password,
        },
        attributes: {
          email: input.email,
          aka: input.aka,
          first_name: input.firstName,
          last_name: input.lastName,
          gender: input.gender,
          role: "participant",
        },
      });

      await ctx.db
        .update(user)
        .set({
          bio: input.bio,
          dateOfBirth: input.dateOfBirth,
        })
        .where(eq(user.id, res.userId));

      await ctx.db.insert(participantUser).values({
        userID: res.userId,
      });

      return res;
    }),
  signupHost: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        gender: z.string().min(1),
        bio: z.string(),
        dateOfBirth: z.date(),
        interests: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.auth.createUser({
        key: {
          providerId: "email",
          providerUserId: input.email.toLowerCase(),
          password: input.password,
        },
        attributes: {
          email: input.email,
          aka: input.username,
          first_name: input.firstName,
          last_name: input.lastName,
          gender: input.gender,
          role: "host",
        },
      });

      await ctx.db
        .update(user)
        .set({
          bio: input.bio,
          dateOfBirth: input.dateOfBirth,
        })
        .where(eq(user.id, res.userId));

      await ctx.db.insert(hostUser).values({
        userID: res.userId,
      });

      await ctx.db.insert(hostInterest).values(
        input.interests.map((interest) => ({
          userID: res.userId,
          interest,
        })),
      );

      return res;
    }),
});
