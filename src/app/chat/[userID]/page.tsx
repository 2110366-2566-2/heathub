import { ChatRoom } from "@/app/chat/components/ChatRoom";
import { serverapi } from "@/trpc/server";

export default async function Chat({ params }: { params: { userID: string } }) {
  const user = await serverapi.auth.me.query();

  const pairUser = await serverapi.auth.getUserPublicData.query({
    userID: params.userID,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white w-full">
         <div className="flex flex-col items-center gap-2 fixed top-0 bg-white z-10">
          <p className="text-2x">
            {user ? user.firstName : "Loading tRPC query..."}
          </p>
          <p className="text-2xl">{pairUser?.aka}</p>
        </div>
        <ChatRoom withUser={params.userID} />
    </main>
  );
}
