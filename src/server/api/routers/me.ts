import { blockList } from "@/server/db/schema";
import { createTRPCRouter, userProcedure } from "@/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
export const meRouter = createTRPCRouter({
  myBlockedUsers: userProcedure.query(async ({ ctx }) => {
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
    .input(z.object({ blockUserID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(blockList).values({
        userID: ctx.session.user.userId,
        blockedUserID: input.blockUserID,
      });
    }),
  unBlockUserByID: userProcedure
    .input(z.object({ blockUserID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(blockList)
        .where(
          and(
            eq(blockList.userID, ctx.session.user.userId),
            eq(blockList.blockedUserID, input.blockUserID),
          ),
        );
    }),
});
