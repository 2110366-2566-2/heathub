"use server";

import { auth } from "../server/api/auth";
import { cookies } from "next/headers";
import { serverapi } from "@/trpc/server";

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    const key = await auth.useKey("email", email.toLowerCase(), password);

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const sessionCookie = auth.createSessionCookie(session);
    cookies().set(sessionCookie);
    return "";
  } catch (error) {
    console.error(error);
    return "Invalid email or password";
  }
}

export async function GetAllParticipant() {
  try {
    const data = await serverapi.auth.getParticipants.query();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
