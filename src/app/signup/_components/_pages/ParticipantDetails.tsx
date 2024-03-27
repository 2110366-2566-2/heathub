import { type Dispatch, type SetStateAction } from "react";
import { type User } from "../../interfaces";
import GoBackArrow from "../BackArrow";
import ComponentsGround from "../ParticipantDetailsComponentGround";

interface ParticipantDetailsProps {
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

export default function ParticipantDetails(props: ParticipantDetailsProps) {
  const { setData, setPage, page, data } = props;
  return (
    <div className="min-w-screen flex h-full min-h-screen w-full flex-col gap-y-8 overflow-hidden bg-invert p-6">
      <div className="flex w-full flex-row">
        <GoBackArrow Page={page} setPage={setPage} />
      </div>
      <ComponentsGround data={data} setData={setData} />
    </div>
  );
}
