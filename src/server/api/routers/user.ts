import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hostInterest, hostUser, user } from "@/server/db/schema";
import {
  and,
  eq,
  gte,
  inArray,
  like,
  lte,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import Fuse from "fuse.js";
import { z } from "zod";

export const userRouter = createTRPCRouter({
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
          dateOfBirth: true,
        },
      });
      return res;
    }),

  getParticipants: publicProcedure.query(async ({ ctx }) => {
    const participants = await ctx.db.query.user.findMany({
      where: eq(user.role, "participant"),
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
    return participants;
  }),
  getHostData: publicProcedure
    .input(
      z.object({
        hostID: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db
        .select({
          interests: sql`GROUP_CONCAT(${hostInterest.interest}) AS interests`,
          avgRating: hostUser.avgRating,
          reviewCount: hostUser.reviewCount,
          username : user.aka,
          image : user.profileImageURL,
          verifiedStatus: hostUser.verifiedStatus,
        })
        .from(hostUser)
        .where(eq(hostUser.userID, input.hostID))
        .leftJoin(hostInterest, eq(hostInterest.userID, hostUser.userID))
        .innerJoin(user , eq(user.id,hostUser.userID))
        .groupBy(hostUser.userID)
        .then((result) => {
          return result.map((row) => {
            const arrayInterests = (row.interests as string)
              ? (row.interests as string).split(",")
              : [];
            return {
              ...row,
              interests: arrayInterests,
            };
          });
        });
      return res;
    }),

  getHostsByFilter: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        interests: z.array(z.string()).optional(),
        rating: z.number().optional(),
        gender: z.string().optional(),
        ageRange: z
          .tuple([
            z.number().nonnegative().max(99),
            z.number().nonnegative().max(99),
          ])
          .optional()
          .default([0, 99]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const minDate = new Date();
      const maxDate = new Date();

      maxDate.setFullYear(
        maxDate.getFullYear() - Math.max(input.ageRange[0], 0),
      ); // min age = 0 = current = maxdate

      minDate.setFullYear(
        minDate.getFullYear() - Math.min(input.ageRange[1], 99),
      ); // max age = 99 = current-99 = mindate

      let checkInput: SQL<unknown>[] = [];

      if (input.searchQuery) {
        const fuzzyName = or(like(user.aka, `%${input.searchQuery}%`));

        if (fuzzyName) {
          checkInput.push(fuzzyName);
        }
      }

      if (!input.rating) {
        input.rating = 0;
      }

      if (input.interests && input.interests.length != 0) {
        checkInput.push(
          inArray(
            hostUser.userID,
            ctx.db
              .select({ userID: hostUser.userID })
              .from(hostUser)
              .innerJoin(hostInterest, eq(hostInterest.userID, user.id))
              .where(and(inArray(hostInterest.interest, input.interests)))
              .groupBy(hostUser.userID)
              .having(
                sql`count(${hostUser.userID}) >= ${input.interests.length}`,
              ),
          ),
        );
      }

      if (input.gender) {
        checkInput.push(eq(user.gender, input.gender));
      }

      const select = await ctx.db
        .select({
          aka: user.aka,
          bio: user.bio,
          email: user.email,
          firstName: user.firstName,
          gender: user.gender,
          role: user.role,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          profileImageURL: user.profileImageURL,
          interests: sql`GROUP_CONCAT(${hostInterest.interest}) AS interests`,
          avgRating: hostUser.avgRating,
          reviewCount: hostUser.reviewCount,
          id: user.id,
          verifiedStatus: hostUser.verifiedStatus,
        })
        .from(hostUser)
        .where(
          and(
            gte(user.dateOfBirth, minDate),
            lte(user.dateOfBirth, maxDate),
            gte(hostUser.avgRating, input.rating),
            and(...checkInput),
          ),
        )
        .innerJoin(user, eq(user.id, hostUser.userID))
        .innerJoin(hostInterest, eq(hostInterest.userID, hostUser.userID))
        .groupBy(hostUser.userID)
        .then((result) => {
          return result.map((row) => ({
            ...row,
            interests: (row.interests as string).split(","),
          }));
        });

      if (input.searchQuery) {
        const list = new Fuse(select, {
          shouldSort: true,
          threshold: 1,
          keys: ["aka", "firstName", "lastName"],
        });

        const result = list.search(input.searchQuery).map((item) => item.item);
        return result;
      }

      return select;
    }),
});
