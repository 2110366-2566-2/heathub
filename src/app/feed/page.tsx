import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import Card from "@/app/_components/feed/card";
import { NavBar, NavBarMobile } from "../_components/navbar";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeedPage() {
  return (
    <div className="flex h-auto flex-row bg-bgColor">
      <NavBar />
      <div className="fixed bottom-4 z-50 w-full justify-center ">
        <NavBarMobile />
      </div>
      <div className="flex w-full flex-col gap-4 p-6 lg:p-9">
        <div className="flex flex-col gap-4 self-stretch">
          <Header />
          <SearchBar />
        </div>
        <div className="flex justify-center rounded-xl border border-solid border-primary-300 bg-white p-6 lg:p-9 ">
          <CardContainer />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="relative flex items-center gap-[10px]">
        <FontAwesomeIcon
          icon={faCompass}
          className="h-10 w-10 text-secondary-400"
        />
        <Typography variant="h2" className="text-primary-900">
          Discover
        </Typography>
        <div className="absolute right-0 h-12 w-14 items-center rounded-lg bg-primary-500 p-2 md:hidden"></div>
      </div>
      <Typography
        variant="h4"
        className="text-base text-primary-700 lg:text-xl"
      >
        Unlock a World of Possibilities: Find Friends for Every Adventure on
        HeatHub!
      </Typography>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="hidden flex-row items-center gap-4 self-stretch md:flex">
      <Input className="h-full p-3" placeholder="Search for friends" />
      <div className="h-12 w-14 rounded-lg bg-primary-500 p-2"></div>
    </div>
  );
}

function CardContainer() {
  return (
    <div className="grid w-full min-w-[280px] grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

// <div className="fixed bottom-4 z-50 w-full justify-center ">
//         <NavBarMobile />
//       </div>
