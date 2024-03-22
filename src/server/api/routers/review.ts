import {
  createTRPCRouter,
  participantProcedure,
  publicProcedure,
  userProcedure,
} from "@/server/api/trpc";
import { event, hostUser, ratingAndReview, user } from "@/server/db/schema";
import { eq, and, gte, desc, avg, count } from "drizzle-orm";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  getReviews: publicProcedure
    .input(
      z.object({
        hostID: z.string(),
        filter: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const reviewsWithData = await ctx.db
        .select({
          location: event.location,
          participantName: user.aka,
          participantPic: user.profileImageURL,
          ratingScore: ratingAndReview.ratingScore,
          reviewDesc: ratingAndReview.reviewDesc,
          createdAt: ratingAndReview.createdAt,
          eventDate: event.startTime,
        })
        .from(hostUser)
        .innerJoin(user, eq(user.id, hostUser.userID))
        .innerJoin(ratingAndReview, eq(ratingAndReview.hostID, hostUser.userID))
        .innerJoin(event, eq(event.id, ratingAndReview.eventID))
        .where(
          and(
            eq(hostUser.userID, input.hostID),
            gte(ratingAndReview.ratingScore, input.filter),
          ),
        )
        .orderBy(desc(ratingAndReview.ratingScore));

      return reviewsWithData;
    }),
  createReview: participantProcedure
    .input(
      z.object({
        eventID: z.number(),
        participantID: z.string(),
        hostID: z.string(),
        ratingScore: z.number(),
        reviewDesc: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const date = new Date();
      await ctx.db.insert(ratingAndReview).values({
        eventID: input.eventID,
        participantID: input.participantID,
        hostID: input.hostID,
        ratingScore: input.ratingScore,
        reviewDesc: input.reviewDesc,
        createdAt: date,
      });
      const result = await ctx.db
        .select({
          avg: avg(ratingAndReview.ratingScore),
        })
        .from(ratingAndReview)
        .where(eq(ratingAndReview.hostID, input.hostID));

      const avgScore = result[0];
      if (!avgScore?.avg) {
        return;
      }

      const avgF = parseFloat(avgScore.avg);
      const roundedAvg = Math.round(avgF * 10) / 10;
      await ctx.db
        .update(hostUser)
        .set({
          avgRating: roundedAvg,
        })
        .where(eq(hostUser.userID, input.hostID));
      return;
    }),
  getReviewsNumber: publicProcedure
    .input(
      z.object({
        hostID: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.db
        .select({
          ratingScore: ratingAndReview.ratingScore,
          count: count(),
        })
        .from(ratingAndReview)
        .where(eq(ratingAndReview.hostID, input.hostID))
        .groupBy(ratingAndReview.ratingScore)
        .orderBy(desc(ratingAndReview.ratingScore));

      return reviews;
    }),
  getReview: userProcedure
  .input(
    z.object({
      eventID: z.number(),
    }),
  ).query( async ({ctx,input})=>{
    const result = await ctx.db.query.ratingAndReview.findFirst({
      where : eq(ratingAndReview.eventID,input.eventID),
      columns:{
        ratingScore : true,
        reviewDesc : true
      }
    })
    return result
  })
});
