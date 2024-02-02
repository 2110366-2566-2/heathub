"use server";

import { auth } from "../server/api/auth";

import { cookies } from "next/headers";

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


export async function signUp(formData:FormData){
  try{
    const aka = formData.get("aka") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const bio = formData.get("bio") as string | null;
    const dateOfBirth = formData.get("dateOfBirth") as string | null;
    const gender = formData.get("gender") as string | null;
    const role = formData.get("role") as string | null;
    const profileImageURL = formData.get("profileImageURL") as string | null
  
    if(!aka || !email || !firstName || !lastName || !gender || !role ){
      throw new Error("Missing aka, emai");
    }
    if(!aka){
      throw new Error("Missing AKA")
    }
    if(!email || !password){
      throw new Error("Missing email or password")
    }
    if(!firstName || !lastName){
      throw new Error("Missing firstName or lastName")
    }
    if(!gender){
      throw new Error("Missing gender")
    }
    // if(role != "host" && role != "participant"){
    //   throw new Error("Invalid role")
    // }
  
  }
  catch (error){
    console.log(error);
    return "Register Data invalid"
  }
}

export async function plus(a: number, b: number) {
  return a + b;
}
