import { type Dispatch, type SetStateAction } from "react";
import { type User } from "../../interfaces";
import Image from "next/image";
import GoBackArrow from "../BackArrow";
import ComponentsGround from "../EmailPasswordComponentsGround";

interface EmailPasswordProps {
  setData: (data: User) => void;
  setPage: Dispatch<
    SetStateAction<
      | "ChooseRole"
      | "EmailPassword"
      | "HostDetails"
      | "ParticipantDetails"
      | "HostInterest"
    >
  >;
  page: string;
  data: User;
}

export default function EmailPassword(props: EmailPasswordProps) {
  const { setData, setPage, page, data } = props;
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-[1_1_555px] bg-gradient-to-b from-primary-300 to-secondary-200 md:block">
        <Quote />
      </div>

      <div className="w-full flex-[2_2_725px] bg-bgColor bg-none">
        <main className="flex min-h-screen w-full flex-col">
          <div className="flex w-full flex-col items-center gap-y-6 p-6 md:gap-y-[140px]">
            <div className="flex w-full flex-row">
              <GoBackArrow Page={page} setPage={setPage} />
            </div>
            <ComponentsGround data={data} setData={setData} setPage={setPage} />
          </div>
        </main>
      </div>
    </div>
  );
}

function Quote() {
  return (
    <div className="mb-[-10px] flex min-h-0 flex-col items-center justify-center md:h-screen">
      <Image
        src="/images/signin/Group.png"
        width={565}
        height={338}
        className="ml-[-50px]"
        alt="Picture"
      />
      <div className="flex flex-col justify-center text-center">
        <div className="h1 font-extrabold text-primary-900">
          Find Your Perfect
        </div>
        <div className="h1 font-extrabold text-primary-900">
          Companion Today!
        </div>
      </div>
    </div>
  );
}
