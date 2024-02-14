import { ChatRoom } from "@/app/chat/components/ChatRoom";
import { serverapi } from "@/trpc/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function Chat({ params }: { params: { userID: string } }) {
  const pairUser = await serverapi.auth.getUserPublicData.query({
    userID: params.userID,
  });

  return (
    <div className="flex h-screen w-full flex-col items-center bg-white">
      <div className="sticky top-0 z-10 mt-14 flex w-full flex-col items-start gap-2 bg-white px-14 max-lg:mt-6 max-lg:px-6">
        <div className="flex w-full flex-row items-center gap-[10px]">
          <Link href="/chat">
            <button className="flex h-6 w-6 flex-row items-center justify-center">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="h-4 w-4 text-high"
              />
            </button>
          </Link>
          <div className="h3 font-bold text-high">{pairUser?.aka}</div>
        </div>
      </div>
      <ChatRoom withUser={params.userID} />
    </div>
  );
}
