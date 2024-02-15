import { ChatRoom } from "@/app/chat/components/ChatRoom";
import { serverapi } from "@/trpc/server";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Chat({ params }: { params: { userID: string } }) {
  const pairUser = await serverapi.user.getUserPublicData.query({
    userID: params.userID,
  });

  return (
    <div className="flex h-screen w-full flex-col items-center bg-white py-6">
      <div className="sticky top-0 z-10 flex w-full flex-col items-start gap-2 bg-white">
        <div className="mb-8 flex w-full flex-row items-center gap-[10px] px-6">
          <Link href="/chat">
            <button className="flex h-6 w-6 flex-row items-center justify-center">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-high h-4 w-4"
              />
            </button>
          </Link>
          <div className="h3 text-high font-bold">{pairUser?.aka}</div>
        </div>
      </div>
      <ChatRoom withUser={params.userID} />
    </div>
  );
}
