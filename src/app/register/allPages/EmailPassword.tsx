import { type Dispatch, type SetStateAction } from "react";
import GoBackArrow from "../_components/BackArrow";
import ComponentsGround from "../_components/EmailPasswordComponentsGround";
import { type User } from "../interfaces";

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
    <div className="min-w-screen h-full min-h-screen w-full overflow-hidden bg-primary-50 p-6 md:p-9">
      <GoBackArrow Page={page} setPage={setPage} />
      <ComponentsGround data={data} setData={setData} setPage={setPage} />
    </div>
  );
}
