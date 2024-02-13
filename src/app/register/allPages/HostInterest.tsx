import GoBackArrow from "../_components/BackArrow";
import ComponentsGround from "../_components/HostInterestComponentsGround";
import { type User } from "../interfaces";

interface HostInterestProps {
  setPage: (page: string) => void;
  page: string;
  data: User;
}

const allInterestList = [
  "Music",
  "Song",
  "Drums",
  "Instruments",
  "Singing",
  "Anime",
  "Manga",
  "Japan",
  "Soccer",
  "Tennis",
  "Basketball",
  "The ETC Band",
  "The Parkinson",
  "MEAN Band",
  "Tattoo color",
  "Yoasobi",
  "Higedan Dism",
  "Apple",
  "Dessert",
  "Cafe",
  "Books",
  "Stamp collecting",
];

export default function HostInterest(props: HostInterestProps) {
  const { setPage, page, data } = props;
  return (
    <div className="min-w-screen h-full min-h-screen w-full overflow-hidden bg-primary-50 p-6 md:p-9">
      <GoBackArrow Page={page} setPage={setPage} />
      <div className="pt-6 sm:p-5 sm:pt-[52px]">
        <ComponentsGround allInterestList={allInterestList} data={data} />
      </div>
    </div>
  );
}
