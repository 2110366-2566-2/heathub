import Image from "next/image";
export default async function Page() {
  return (
    <div className="hidden grow flex-col items-center justify-center gap-2 lg:flex xl:flex">
      <div className="h-fit w-fit">
        <Image width={150} height={150} src="/svgs/no-chat.svg" alt="No chat" />
        <div className="h2-bold text-medium flex items-center justify-center">
          Start a new chat !
        </div>
      </div>
    </div>
  );
}
