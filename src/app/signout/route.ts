import { auth } from "@/server/api/auth";
import { type NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req);
  // check if user is authenticated
  const session = await authRequest.validate();
  if (!session) {
    return new Response(null, {
      headers: {
        Location: "/signin", // redirect to login page
      },
      status: 302,
    });
  }
  // make sure to invalidate the current session!
  await auth.invalidateSession(session.sessionId);

  // for session cookies
  // create blank session cookie
  const sessionCookie = auth.createSessionCookie(null);
  return new Response(null, {
    headers: {
      Location: "/signin", // redirect to login page
      "Set-Cookie": sessionCookie.serialize(), // delete session cookie
    },
    status: 302,
  });
};

export { handler as GET, handler as POST };
