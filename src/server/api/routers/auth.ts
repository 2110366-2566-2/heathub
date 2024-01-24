import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.session?.user ?? null;
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.user.findMany();
    return users;
  }),

  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        gender: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.auth.createUser({
        key: {
          providerId: "username",
          providerUserId: input.username.toLowerCase(),
          password: input.password,
        },
        attributes: {
          email: input.email,
          username: input.username,
          first_name: input.firstName,
          last_name: input.lastName,
          gender: input.gender,
        },
      });

      return res;
    }),
});
