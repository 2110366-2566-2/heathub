import { auth } from "@/server/api/auth";
import { pusher } from "@/server/pusher/pusher";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const pusherAuthDTO = z.object({
  channel_name: z.string(),
  socket_id: z.string(),
});

export async function POST(req: NextRequest) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  const userID = session.user.userId;

  const formdata = await req.formData();
  const { channel_name, socket_id } = pusherAuthDTO.parse({
    channel_name: formdata.get("channel_name"),
    socket_id: formdata.get("socket_id"),
  });
  if (channel_name === `private-user-${userID}`) {
    const authorizedResponse = pusher.authorizeChannel(socket_id, channel_name);
    return NextResponse.json(authorizedResponse);
  }
}
