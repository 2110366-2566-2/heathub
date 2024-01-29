import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import Card from "@/app/_components/feed/card";
import SideBar from "../_components/sidebar";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeedPage() {
  return (
    <div className="flex h-auto w-screen flex-row bg-bgColor">
      <SideBar />
      <div className="flex w-full flex-col gap-4 p-9 sm:ml-[100px]">
        <div className="flex flex-col gap-4 self-stretch">
          <Header />
          <SearchBar />
        </div>
        <div className="flex justify-center rounded-xl border border-solid border-primary-300 bg-white p-9 ">
          <CardContainer />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center gap-[10px]">
        <FontAwesomeIcon
          icon={faCompass}
          className="h-10 w-10 text-primary-500"
        />
        <Typography
          variant="h2"
          className="text-4xl leading-9 text-primary-900"
        >
          Discover
        </Typography>
      </div>
      <Typography variant="h4" className="text-base leading-6 text-primary-700">
        Unlock a World of Possibilities: Find Friends for Every Adventure on
        HeatHub!
      </Typography>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex flex-row items-center gap-4 self-stretch">
      <Input className="h-full p-3" placeholder="Search for friends" />
      <div className="h-12 w-14 rounded-lg bg-primary-500 p-2"></div>
    </div>
  );
}

function CardContainer() {
  return (
    <div className="flex flex-row flex-wrap gap-9">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
