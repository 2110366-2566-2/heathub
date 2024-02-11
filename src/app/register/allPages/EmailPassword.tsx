import GoBackArrow from "../_components/GoBackArrow";
import ComponentsGround from "../host/createAccount/_component/ComponentsGround";

interface EmailPasswordProps {
  setData: (data: object) => void;
  setPage: (page: string) => void;
  data: object;
}

export default function EmailPassword(props: EmailPasswordProps) {
  return;
  <div className="h-[100%] min-h-[100vh] w-[100%] min-w-[100vw] overflow-hidden bg-primary-50 p-6 md:p-9">
    <GoBackArrow />
    <ComponentsGround />
  </div>;
}
