import noChat from "@/../public/svgs/no-chat.svg";
import Image from "next/image";
export default async function Page() {
  return (
    <div className="hidden grow flex-col items-center justify-center gap-2 lg:flex xl:flex">
      <div className="h-fit w-fit">
        <Image priority src={noChat} alt="No chat" />
        <div className="h2-bold flex  items-center justify-center text-medium">
          No Message
        </div>
      </div>
    </div>
  );
}
