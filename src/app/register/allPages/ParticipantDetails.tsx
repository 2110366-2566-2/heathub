import GoBackArrow from "../_components/GoBackArrow";
import { type User } from "../interfaces";
import ComponentsGround from "../_components/ParticipantDetailsComponentGround";

interface ParticipantDetailsProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  page: string;
  data: User;
}

export default function ParticipantDetails(props: ParticipantDetailsProps) {
  return (
    <div className="h-[100%] min-h-[100vh] w-[100%] min-w-[100vw] overflow-hidden bg-primary-50 p-6 md:p-9">
      <div>
        <GoBackArrow Page={props.page} setPage={props.setPage} />
        <ComponentsGround />
      </div>
    </div>
  );
}
