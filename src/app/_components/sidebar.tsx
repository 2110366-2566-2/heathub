import {
  faCalendarCheck,
  faComment,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function SideBar() {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-screen w-[100px] flex-col gap-[10px] bg-white px-6 py-9 shadow-sm">
      <div className="flex h-[762px] flex-col gap-9">
        <Image src="/svgs/logo-default.svg" width={62} height={46} alt="logo" />
        <div className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faCompass} className="h-8 w-8 text-medium" />
          <div className=" absolute left-[62px] hidden h-10 w-1 rounded-sm bg-primary-500 group-hover:block"></div>
        </div>
        <div className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="h-8 w-8 text-medium"
          />
          <div className="absolute left-[62px] hidden h-10 w-1 rounded-sm bg-primary-500 group-hover:block"></div>
        </div>
        <div className="group relative flex h-8 w-8 flex-row items-center self-center hover:cursor-pointer">
          <FontAwesomeIcon icon={faComment} className="h-8 w-8 text-medium" />
          <div className="absolute left-[62px] hidden h-10 w-1 rounded-sm bg-primary-500 group-hover:block"></div>
        </div>
      </div>
      <div className="items-center justify-center self-center">
        <div className="relative flex h-10 w-10">
          <Image
            src="/images/feed/mock-profile/mock-1.jpg"
            fill
            alt="logo"
            className="self-center rounded-full"
            objectFit="cover"
          />
        </div>
      </div>
    </nav>
  );
}
