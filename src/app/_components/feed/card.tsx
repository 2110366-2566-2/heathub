import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMusic } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@/components/ui/typography";

function MockTag() {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex h-[30px] w-[80px] flex-row items-center justify-center gap-1 rounded-lg bg-white bg-opacity-50 px-3">
        <FontAwesomeIcon
          icon={faMusic}
          className="text-white"
          width={12}
          height={12}
        />
        <Typography variant="body6" className="text-white">
          Music
        </Typography>
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div className="relative flex h-[464px] w-full flex-col gap-0 rounded-2xl shadow-md ">
      <div className="relative h-[388px]">
        <Image
          src="/images/feed/mock-profile/mock-1.jpg"
          alt="card"
          objectFit="cover"
          layout="fill"
          className="rounded-t-2xl"
        />
        <div className="absolute bottom-0 flex flex-col gap-2 p-4">
          <div className="flex flex-row gap-1">
            <Typography variant="p" className="text-3xl font-bold text-white">
              Rosy,
            </Typography>
            <Typography variant="p" className="text-3xl text-white">
              23
            </Typography>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
            <MockTag />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 flex h-[76px] w-full items-center justify-center rounded-b-2xl bg-white">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-400 transition hover:cursor-pointer hover:bg-secondary-500"
          style={{ boxShadow: "0px 15px 15px rgba(233, 64, 87, 0.20)" }}
        >
          <FontAwesomeIcon
            icon={faComment}
            className="text-white"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
