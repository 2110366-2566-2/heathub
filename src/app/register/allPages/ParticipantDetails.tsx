import GoBackArrow from "../_components/BackArrow";
import { type User } from "../interfaces";
import ComponentsGround from "../_components/ParticipantDetailsComponentGround";

interface ParticipantDetailsProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  page: string;
  data: User;
}

export default function ParticipantDetails(props: ParticipantDetailsProps) {
  const { setData, setPage, page, data } = props;
  return (
    <div className="min-w-screen h-full min-h-screen w-full overflow-hidden bg-primary-50 p-6 md:p-9">
      <div>
        <GoBackArrow Page={page} setPage={setPage} />
        <ComponentsGround data={data} setData={setData} />
      </div>
    </div>
  );
}
