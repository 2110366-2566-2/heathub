import RolePicker from "../_components/RolePicker";

interface chooseRoleProps {
  setData: (data: object) => void;
  setPage: (page: string) => void;
}

export default function ChooseRole(props: chooseRoleProps) {
  return (
    <div className="min-w-screen flex min-h-screen flex-row overflow-x-hidden">
      <div className=" hidden w-fit min-w-[555px] justify-center lg:flex"></div>
      <div className="flex grow items-center justify-center bg-primary-50 p-6 lg:p-0">
        <RolePicker setData={props.setData} setPage={props.setPage} />
      </div>
    </div>
  );
}
