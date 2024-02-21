import { Input } from "@/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  return (
    <div className="relative h-12 w-full">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-[14px] h-5 w-5 self-center text-placeholder"
      />
      <Input className="p-3 pl-9" placeholder="Search AKA" size="lg" />
    </div>
  );
}
