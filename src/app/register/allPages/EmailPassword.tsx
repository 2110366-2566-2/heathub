import GoBackArrow from "../_components/GoBackArrow";
import ComponentsGround from "../_components/EmailPasswordComponentsGround";
import { type User } from "../interfaces";

interface EmailPasswordProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
  page: string;
  data: User;
}

export default function EmailPassword(props: EmailPasswordProps) {
  return (
    <div className="h-[100%] min-h-[100vh] w-[100%] min-w-[100vw] overflow-hidden bg-primary-50 p-6 md:p-9">
      <GoBackArrow Page={props.page} setPage={props.setPage} />
      <ComponentsGround
        data={props.data}
        setData={props.setData}
        setPage={props.setPage}
      />
    </div>
  );
}
