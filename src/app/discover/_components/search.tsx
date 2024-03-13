import { Input } from "@/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { type UseFormSetValue } from "react-hook-form";

type searchProps = {
  setValues: UseFormSetValue<{
    searchQuery: string;
    interests: string[];
    rating: number;
    gender: string;
    age: {
      min: number;
      max: number;
    };
  }>;
};

export default function Search(props: searchProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="relative h-12 w-full">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-[14px] self-center text-placeholder"
        size="lg"
      />
      <Input
        className={cn("border-none p-3 pl-9", isMobile ? "" : "bg-white")}
        placeholder="Search For partner"
        size="lg"
        onChange={(e) => {
          props.setValues("searchQuery", e.target.value);
        }}
      />
    </div>
  );
}
