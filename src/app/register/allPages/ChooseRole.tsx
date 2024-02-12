import RolePicker from "../_components/RolePicker";
import { type User } from "../interfaces";

interface chooseRoleProps {
  setData: (data: User) => void;
  setPage: (page: string) => void;
}

export default function ChooseRole(props: chooseRoleProps) {
  return (
    <div className="min-w-screen flex min-h-screen flex-row overflow-x-hidden">
      <div className=" hidden w-fit min-w-[555px] justify-center bg-gradient-to-b from-primary-300 to-secondary-200 text-white lg:flex"></div>
      <div className="flex grow items-center justify-center bg-primary-50 p-6 lg:p-0">
        <RolePicker setData={props.setData} setPage={props.setPage} />
      </div>
    </div>
  );
}
