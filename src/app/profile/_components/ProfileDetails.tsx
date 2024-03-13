import { Tag } from "@/app/_components/tag";
import { CardContent, Card } from "@/components/ui/card";
import { tagStyle } from "@/utils/icon-mapping";
import { faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileButton from "./EditProfileButton";
import { type ProfilePreviewProps } from "./profile-container";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChatDialog } from "@/app/discover/_components/chat";
import { cn } from "@/utils/tailwind-merge";
import { Toggle } from "@/components/ui/toggle";

export default function ProfileDetails(props: ProfilePreviewProps) {
  const {
    interests,
    image,
    name,
    age,
    firstName,
    lastName,
    gender,
    about,
    dateOfBirth,
  } = props;

  const isMobile = useMediaQuery({ maxWidth: 1023 });
  return (
    <Card className="h-fit min-h-[334px] w-full justify-center rounded-none border-none shadow-none lg:min-h-[256px] lg:rounded-lg lg:border-solid lg:border-primary-300 lg:bg-white lg:p-5">
      <CardContent className="flex h-full w-full flex-col items-center gap-y-4 p-0 lg:gap-0">
        <div className="h-max-[128px] flex h-fit w-full flex-row gap-x-6 lg:h-[124px]">
          <div className="flex h-full w-full flex-row gap-4">
            <div className="relative h-[100px] w-[100px] flex-none rounded-full">
              <Image
                className="items-center justify-center rounded-full"
                src={image}
                width={100}
                height={100}
                alt="profilePic"
              />
              {isMobile ? (
                <Drawer>
                  <DrawerTrigger>
                    <div className="z-100 absolute bottom-0 right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                  </DrawerTrigger>
                  <DrawerOverlay
                    className="bg-opacity-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <DrawerProfile {...props} />
                </Drawer>
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <div className="z-100 absolute bottom-0 right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-500 bg-neutral-50 p-1 text-neutral-500">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                  </DialogTrigger>
                  <DialogProfile {...props} />
                </Dialog>
              )}
            </div>

            <div className="flex h-fit w-full flex-col gap-y-2">
              <div className="h3 font-bold text-purple-900">{`${props.name}, ${props.age}`}</div>
              <div className="flex h-fit w-full flex-col gap-y-1">
                <div className="h5 flex h-6 flex-row items-center gap-x-1 text-medium">
                  <div className="flex h-[18px] flex-row items-center gap-x-2">
                    <div>{props.firstName}</div>
                    <div>{props.lastName}</div>
                  </div>
                  <div>•</div>
                  <div className="flex h-[18px] flex-row items-center gap-x-2">
                    <div>{props.gender}</div>
                  </div>
                </div>
                <div className="h5 line-clamp-3 w-full text-placeholder md:line-clamp-2">
                  {props.about}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden h-full w-fit lg:flex">
            <EditProfileButton
              cUsername={about}
              cGender={gender}
              cBio={about}
              cDOB={dateOfBirth}
              cProfileURL={image}
            />
          </div>
        </div>
        <div className="flex h-fit min-h-[94px] w-full flex-col gap-y-3">
          <div className="h6 font-bold text-medium">Interest</div>
          <div className="flex h-fit w-full flex-row flex-wrap gap-2">
            {interests.map((tag, index) => (
              <Tag
                key={index}
                variant="solid"
                icon={tagStyle[tag].icon}
                size="md"
                color={tagStyle[tag].color}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex h-10 w-full lg:hidden">
          <EditProfileButton
            cUsername={props.name}
            cGender={props.gender}
            cBio={props.about}
            cDOB={props.dateOfBirth}
            cProfileURL={props.image}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DialogProfile(props: ProfilePreviewProps) {
  const { image } = props;
  return (
    <DialogContent className="flex gap-3 bg-white p-0 md:min-h-[568px] md:min-w-[720px] lg:min-w-[845px]">
      <div className="relative w-[460px]">
        <Image
          src={image}
          alt="card"
          className="rounded-l-3xl object-cover object-top"
          fill
        />
      </div>
      <div className="relative flex flex-col gap-3 rounded-r-3xl py-6 pr-6">
        <NameReview {...props} />
        <About props={props} />
        <Interests props={props} />
        <div className="absolute bottom-6 self-center"></div>
      </div>
    </DialogContent>
  );
}

function DrawerProfile(props: ProfilePreviewProps) {
  return (
    <DrawerContent className="flex flex-col gap-2 bg-white p-4">
      <div className="flex flex-col gap-2 rounded-r-3xl">
        <NameReview {...props} />
        <div className="flex flex-col gap-2 py-2">
          <About props={props} isDrawer />
          <Interests props={props} isDrawer />
        </div>
      </div>
      <div className="flex w-full justify-center"></div>
    </DrawerContent>
  );
}

function NameReview(props: ProfilePreviewProps) {
  const { name, age, rating, reviews } = props;
  return (
    <div className="flex flex-col justify-between py-3">
      <div className="flex flex-row gap-1">
        <div className="flex flex-row items-center gap-1">
          <FontAwesomeIcon
            icon={faStar}
            className="h-5 w-5 text-secondary-400"
          />
          <div className="h4 font-bold">{rating.toFixed(1)}</div>
        </div>
        <div className="h6 self-center font-bold text-medium">
          ({reviews} reviews)
        </div>
      </div>
      <div className="h2 font-bold">
        {name}, {age}
      </div>
    </div>
  );
}

function About({
  props,
  isDrawer,
}: {
  props: ProfilePreviewProps;
  isDrawer?: boolean;
}) {
  const { about } = props;
  const maxWidth = isDrawer ? "" : "max-w-[340px]";
  return (
    <div className={cn("flex flex-col gap-3 text-wrap break-words", maxWidth)}>
      <div className="h4 text-medium">About</div>
      <div className="h5 text-high">{about}</div>
    </div>
  );
}

function Interests({
  props,
  isDrawer,
}: {
  props: ProfilePreviewProps;
  isDrawer?: boolean;
}) {
  const { interests } = props;
  const maxWidth = isDrawer ? "" : "max-w-[340px]";
  return (
    <div className={cn("flex flex-col gap-3 text-wrap break-words", maxWidth)}>
      <div className="h4 text-medium">Interests</div>
      <div className="flex flex-row flex-wrap items-center justify-start gap-2 self-stretch">
        {interests.map((tag, index) => {
          return (
            <Tag
              key={index}
              variant="solid"
              icon={tagStyle[tag].icon}
              size="md"
              color={tagStyle[tag].color}
            >
              {tag}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
