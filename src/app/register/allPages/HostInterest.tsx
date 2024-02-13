import GoBackArrow from "../_components/GoBackArrow";
import ComponentsGround from "../_components/HostInterestComponentsGround";
import { type User } from "../interfaces";

interface HostInterestProps {
  setData: (data: User) => void;
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
  return (
    <div className="h-[100%] min-h-[100vh] w-[100%] min-w-[100vw] overflow-hidden bg-primary-50 p-6 md:p-9">
      <GoBackArrow Page={props.page} setPage={props.setPage} />
      <div className="pt-6 sm:p-5 sm:pt-[52px]">
        <ComponentsGround
          allInterestList={allInterestList}
          data={props.data}
          setData={props.setData}
          setPage={props.setPage}
        />
      </div>
    </div>
  );
}
