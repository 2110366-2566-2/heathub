"use server";

import { redirect } from "next/navigation";
import { auth } from "./../api/auth";

import { cookies } from "next/headers";

export async function signIn(formData: FormData) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  const key = await auth.useKey("username", username.toLowerCase(), password);

  const session = await auth.createSession({
    userId: key.userId,
    attributes: {},
  });

  const sessionCookie = auth.createSessionCookie(session);
  cookies().set(sessionCookie);
  redirect("/");
}
