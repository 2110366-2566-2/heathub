import RolePicker from "../_components/RolePicker";

export default function chooseRole() {
  return (
    <div className="min-w-screen flex min-h-screen flex-row overflow-x-hidden">
      <div className="hidden w-fit min-w-[555px] justify-center bg-primary-500 lg:flex"></div>
      <div className="flex grow items-center justify-center bg-primary-50">
        <RolePicker />
      </div>
    </div>
  );
}
