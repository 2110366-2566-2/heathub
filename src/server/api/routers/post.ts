import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

import { db } from "@/server/db";

async function getLatestPosts(database: typeof db) {
  return await database.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    limit: 10,
    with: {
      postedBy: {
        columns: {
          aka: true,
        },
      },
    },
  });
}

export const postRouter = createTRPCRouter({
  create: userProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (tx) => {
        await tx.insert(posts).values({
          name: input.name,
          authorID: ctx.session.user.userId,
        });

        const result = await tx.query.posts.findFirst({
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
          with: {
            postedBy: {
              columns: {
                aka: true,
              },
            },
          },
        });

        return result;
      });

      await ctx.pusher.trigger("global", "add_post", result);
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await getLatestPosts(ctx.db);
  }),

  removeAll: userProcedure.mutation(async ({ ctx }) => {
    await ctx.db.delete(posts);
  }),
});
