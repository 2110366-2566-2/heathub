"use server";

import { api } from "@/trpc/react";
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


export async function signUpEmailCheck(formData:FormData){
  try{
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
  
    if(!email || !password){
      throw new Error("Missing email or password")
    }
    if(password.length < 8){
      throw new Error("Password must more than 8 characters")
    }
    return ""
  }
  catch (error){
    return (error as Error ).message
  }
}

export async function detailCheck(formData:FormData){
  try{
    const aka = formData.get("username") as string | null;
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const dateOfBirth = formData.get("dateOfBirth") as string | null;
    const gender = formData.get("gender") as string | null;
    
    if(!aka){
      throw new Error("Missing AKA")
    }
    if(!firstName || !lastName){
      throw new Error("Missing firstName or lastName")
    }
    if(!gender){
      throw new Error("Missing gender")
    }
    if(!dateOfBirth){
      throw new Error("MissingBirthDate")
    }
    return null
  }
  catch (error){
    return (error as Error).message
  }
}

export async function GetAllParticipant(){
  try{
    const {data} = api.auth.getAllParticipant.useQuery()
    return data

  }catch(err){
    return err
  }
}


export async function plus(a: number, b: number) {
  return a + b;
}
