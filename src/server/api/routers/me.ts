import { createTRPCRouter, userProcedure } from "@/server/api/trpc";
import { blockList } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
export const meRouter = createTRPCRouter({
  myBlockedUsers: userProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/api/users/me/blocked/",
        description: "Get all blocked users",
        protect: true,
      },
    })
    .input(z.object({}))
    .output(
      z.array(
        z.object({
          userID: z.string(),
          blockedUserID: z.string(),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      const blockList = await ctx.db.query.blockList.findMany({
        where: (blockList, { eq }) =>
          eq(blockList.userID, ctx.session.user.userId),
        with: {
          blockUser: true,
        },
      });
      return blockList;
    }),
  blockUserByID: userProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/api/users/me/block/",
        description: "Block a user",
        protect: true,
      },
    })
    .input(z.object({ blockUserID: z.string() }))
    .output(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(blockList).values({
          userID: ctx.session.user.userId,
          blockedUserID: input.blockUserID,
        });
        return {
          message: "User has been blocked successfully.",
        };
      } catch (e) {
        console.log(e);
        return {
          message: "Error occurred while processing the request.",
        };
      }
    }),
  unBlockUserByID: userProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/api/users/me/block/",
        description: "Unblock a user",
        protect: true,
      },
    })
    .input(z.object({ blockUserID: z.string() }))
    .output(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .delete(blockList)
          .where(
            and(
              eq(blockList.userID, ctx.session.user.userId),
              eq(blockList.blockedUserID, input.blockUserID),
            ),
          );
        return {
          message: "User has been blocked successfully.",
        };
      } catch (e) {
        console.log(e);
        return {
          message: "Error occurred while processing the request.",
        };
      }
    }),
});
