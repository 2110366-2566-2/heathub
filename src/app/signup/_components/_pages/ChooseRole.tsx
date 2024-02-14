import Image from "next/image";
import { type Dispatch, type SetStateAction } from "react";

import { type User } from "../../interfaces";
import RolePicker from "../RolePicker";

interface chooseRoleProps {
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
}

export default function ChooseRole(props: chooseRoleProps) {
  const { setData, setPage } = props;
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-[1_1_555px] bg-gradient-to-b from-primary-300 to-secondary-200 md:block">
        <Quote />
      </div>

      <div className="flex-[2_2_725px]  bg-gradient-to-b from-primary-300 to-secondary-200 md:bg-bgColor md:bg-none">
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="md:hidden">
            <Quote />
          </div>
          <div className="container flex flex-col items-center justify-center gap-6 px-4 py-6 md:gap-9 md:py-16">
            <RolePicker setData={setData} setPage={setPage} />
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
        <div className="md:h1 h2 font-bold text-primary-900 md:font-bold">
          Find Your Perfect
        </div>
        <div className="md:h1 h2 font-bold text-primary-900 md:font-bold">
          Companion Today!
        </div>
      </div>
    </div>
  );
}
