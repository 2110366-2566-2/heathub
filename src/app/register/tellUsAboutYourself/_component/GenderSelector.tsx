import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function GenderSelector() {
  const customGender = () => {
    return;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="lg:h3-bold md:h5-bold text-center">
        Select your Gender
      </div>
      <ToggleGroup
        className="grid aspect-square w-52 grid-cols-2 gap-4 self-center p-4 md:w-full"
        type="single"
      >
        <ToggleGroupItem
          className="h-full w-full gap-y-1 rounded-xl border border-solid border-primary-500 bg-primary-100 px-4 py-2"
          value="man"
          aria-label="Toggle man"
        >
          <div className="h-4 w-4">A</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          className="h-full w-full gap-y-1 rounded-xl border border-solid border-primary-500 bg-primary-100 px-4 py-2"
          value="woman"
          aria-label="Toggle woman"
        >
          <div className="h-4 w-4">B</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          className="h-full w-full gap-y-1 rounded-xl border border-solid border-primary-500 bg-primary-100 px-4 py-2"
          value="custom"
          aria-label="Toggle custom"
        >
          <div className="h-4 w-4">C</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          className="h-full w-full gap-y-1 rounded-xl border border-solid border-primary-500 bg-primary-100 px-4 py-2"
          value="notToSay"
          aria-label="Toggle notToSay"
        >
          <div className="h-4 w-4">D</div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
