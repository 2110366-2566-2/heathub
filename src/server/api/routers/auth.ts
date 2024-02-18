import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
} from "@/server/api/trpc";
import {
  hostInterest,
  hostUser,
  participantUser,
  passwordResetRequest,
  user,
} from "@/server/db/schema";
import { sendResetPasswordEmail } from "@/server/resend/resend";
import { type SQL, and, eq, gte, inArray, lte, sql } from "drizzle-orm";
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
  getHostsByFilter: publicProcedure
    .input(
      z.object({
        interests: z.array(z.string()).optional(),
        rating: z.number().optional(),
        gender: z.string().optional(),
        ageRange: z.tuple([z.number() || 0, z.number() || 99]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if(!input.ageRange){
        input.ageRange = [0,99]
      }
      const minDate = new Date();
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - (input.ageRange[0] ?? 0)); // min age = 0 = current = maxdate
      minDate.setFullYear(minDate.getFullYear() - (input.ageRange[1] ?? 99)); // max age = 99 = current-99 = mindate
      let checkInput: SQL<unknown>[] = [];
      if(!input.rating){
        input.rating = 0
      }
      if (input.interests) {
        if (input.interests.length != 0) {
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
      }
      if (input.gender) {
        if(input.gender != ""){
          checkInput.push(eq(user.gender, input.gender));
        }
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
        })
        .from(hostUser)
        .where(
          and(
            gte(user.dateOfBirth, minDate),
            lte(user.dateOfBirth, maxDate),
            gte(hostUser.avgRating, input.rating),
            and(...checkInput)
          ),
        )
        .innerJoin(user, eq(user.id, hostUser.userID))
        .innerJoin(hostInterest, eq(hostInterest.userID, hostUser.userID))
        .groupBy(hostUser.userID)
        .then((result) => {
          return result.map((row) => ({
            ...row,
            interests: (row.interests as string).split(","), // Split the string into an array
          }));
        });
      return select;
    }),
  isEmailAlreadyExist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
        columns: {
          id: true,
        },
      });

      if (!userId) {
        return false;
      }
      return true;
    }),
  isAKAAlreadyExist: publicProcedure
    .input(
      z.object({
        aka: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = await ctx.db.query.user.findFirst({
        where: eq(user.aka, input.aka),
        columns: {
          id: true,
        },
      });
      if (!userId) {
        return false;
      }
      return true;
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
  changePassword: userProcedure
    .input(
      z.object({
        oldPassword: z.string().min(8),
        newPassword: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail = ctx.session.user.email;
      await ctx.auth.useKey(
        "email",
        userEmail.toLowerCase(),
        input.oldPassword,
      );
      await ctx.auth.updateKeyPassword("email", userEmail, input.newPassword);
    }),
  resetPasswordByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        url: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userID = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
        columns: {
          id: true,
        },
      });

      if (!userID) {
        console.warn(`User with email ${input.email} not found`);
        return;
      }

      const uuid = crypto.randomUUID();

      await ctx.db.insert(passwordResetRequest).values({
        id: uuid,
        userID: userID.id,
      });

      await sendResetPasswordEmail(input.email, uuid, input.url);
    }),

  validatingEmailToken: publicProcedure
    .input(z.object({ emailToken: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.passwordResetRequest.findFirst({
        where: eq(passwordResetRequest.id, input.emailToken),
        columns: {
          userID: true,
          expires: true,
        },

        with: {
          user: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              aka: true,
              profileImageURL: true,
            },
          },
        },
      });

      if (!data) {
        return { status: "not_found" } as const;
      }

      if (data.expires < new Date()) {
        await ctx.db
          .delete(passwordResetRequest)
          .where(eq(passwordResetRequest.id, input.emailToken));
        return { status: "expired" } as const;
      }

      return { status: "valid" as const, user: data.user };
    }),

  changePasswordByEmailToken: publicProcedure
    .input(
      z.object({
        emailToken: z.string(),
        newPassword: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.query.passwordResetRequest.findFirst({
        where: eq(passwordResetRequest.id, input.emailToken),
        columns: {
          userID: true,
          expires: true,
        },
        with: {
          user: {
            columns: {
              email: true,
            },
          },
        },
      });

      if (!data) {
        throw new Error("Invalid email token");
      }

      if (data.expires < new Date()) {
        await ctx.db
          .delete(passwordResetRequest)
          .where(eq(passwordResetRequest.id, input.emailToken));
        throw new Error("Email token expired");
      }

      await ctx.auth.updateKeyPassword(
        "email",
        data.user.email,
        input.newPassword,
      );

      await ctx.db
        .delete(passwordResetRequest)
        .where(eq(passwordResetRequest.id, input.emailToken));
    }),
});
