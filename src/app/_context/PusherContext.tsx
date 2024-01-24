"use client";
import { env } from "@/env";
import Pusher from "pusher-js";

let sharedClient: Pusher | null = null;

export const usePusher = () => {
  if (!sharedClient) {
    sharedClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap1",
    });
  }

  return sharedClient;
};
