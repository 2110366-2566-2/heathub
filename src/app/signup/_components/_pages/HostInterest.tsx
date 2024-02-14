import { tagList } from "@/utils/icon-mapping";
import { type Dispatch, type SetStateAction } from "react";
import { type User } from "../../interfaces";
import GoBackArrow from "../BackArrow";
import ComponentsGround from "../HostInterestComponentsGround";

interface HostInterestProps {
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

export default function HostInterest(props: HostInterestProps) {
  const { setPage, page, data } = props;
  return (
    <div className="min-w-screen h-full min-h-screen w-full overflow-hidden bg-primary-50 p-6 md:p-9">
      <GoBackArrow Page={page} setPage={setPage} />
      <div className="pt-6 sm:p-5 sm:pt-[52px]">
        <ComponentsGround allInterestList={tagList} data={data} />
      </div>
    </div>
  );
}