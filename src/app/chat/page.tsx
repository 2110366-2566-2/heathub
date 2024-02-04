import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default async function Page() {
  return (
    <div className="hidden grow items-center justify-center gap-2 md:flex">
      <FontAwesomeIcon
        icon={faComment}
        className={"h-10 w-10 text-secondary-400"}
      />
      <span className="h2-bold text-primary-900">Message</span>
    </div>
  );
}
