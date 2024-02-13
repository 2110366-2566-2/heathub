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
    <div className="flex h-screen flex-col items-center bg-white w-full">
        <div className="flex flex-col items-start gap-2 sticky top-0 bg-white z-10 px-14 max-lg:px-6 mt-14 max-lg:mt-6 w-full">
          <div className="flex flex-row w-full items-center gap-[10px]">
            <Link href="/chat">
              <button className="w-6 h-6 flex flex-row items-center justify-center">
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-high" />
              </button>
            </Link>
            <div className="h3 font-bold text-high">{pairUser?.aka}</div>
          </div>
        </div>
        <ChatRoom withUser={params.userID} />
    </div>
  );
}
