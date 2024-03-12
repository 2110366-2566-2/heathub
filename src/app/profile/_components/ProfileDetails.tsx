import { Tag } from "@/app/_components/tag";
import { CardContent, Card } from "@/components/ui/card";
import { tagIcon } from "@/utils/icon-mapping";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileButton from "./EditProfileButton";
import { type ProfilePreviewProps } from "./profile-container";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerOverlay, DrawerTrigger } from "@/components/ui/drawer";
import {
  DialogProfile,
  DrawerProfile,
} from "@/app/discover/_components/profile-preview";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
    <Card className="h-fit min-h-[334px] w-full justify-center rounded-none border-none p-5 shadow-none lg:min-h-[256px] lg:rounded-lg lg:border-solid lg:border-primary-300 lg:bg-white">
      <CardContent className="flex h-full w-full flex-col items-center gap-y-4 p-0 md:gap-0">
        <div className="h-max-[128px] flex h-fit w-full flex-row gap-x-6 md:h-[124px]">
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
            {interests.map((tag) => (
              <Tag key={tag} variant="outline" icon={tagIcon[tag]} size="md">
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
