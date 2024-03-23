import { type Dispatch, type SetStateAction } from "react";
import { type User } from "../../interfaces";
import GoBackArrow from "../BackArrow";
import ComponentsGround from "../HostInterestComponentsGround";

interface HostInterestProps {
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

export default function HostInterest(props: HostInterestProps) {
  const { setData, setPage, page, data } = props;
  return (
    <div className="min-w-screen flex h-full min-h-screen w-full flex-col gap-y-8 overflow-hidden bg-subtle p-6">
      <div className="flex h-fit w-full flex-row">
        <GoBackArrow Page={page} setPage={setPage} />
      </div>
      <ComponentsGround setData={setData} data={data} />
    </div>
  );
}
