"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TagList, tagStyle } from "@/utils/icon-mapping";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faStar,
  faKey,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/utils/tailwind-merge";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type ProfilePreviewProps } from "./profile-container";
import ChangePasswordButton from "@/app/change-password/_component/ChangePasswordButton";

export function MyAccountPreview(props: ProfilePreviewProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  if (isMobile) {
    return (
      <Drawer>
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="h-6 w-6 text-secondary-500"
              />
              <div className="h4 font-bold text-high">My Account</div>
            </div>
            <div className="flex flex-col items-start rounded-xl bg-invert  px-6 py-6 lg:p-4">
              <div className="placeholder flex justify-center text-medium">
                Email
              </div>
              <div className="h5 flex justify-center font-bold text-high">
                {props.email}
              </div>
            </div>
          </div>
          <ChangePasswordButton />
        </div>
        <DrawerOverlay
          className="bg-opacity-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <DrawerProfile {...props} />
      </Drawer>
    );
  }

  return (
    <Dialog>
      <div className="flex h-full w-full flex-col gap-4 lg:justify-between ">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="h-6 w-6 text-secondary-500"
            />
            <div className="h4 font-bold text-high">My Account</div>
          </div>
          <div className="flex flex-col items-start rounded-xl bg-invert px-6 py-6 lg:p-4">
            <div className="placeholder flex justify-center text-medium">
              Email
            </div>
            <div className="h5 flex justify-center font-bold text-high">
              {props.email}
            </div>
          </div>
        </div>
        <ChangePasswordButton />
      </div>

      <DialogProfile {...props} />
    </Dialog>
  );
}

function DialogProfile(props: ProfilePreviewProps) {
  const { image } = props;
  console.log(image);
  return (
    <DialogContent className="flex gap-3 bg-white p-0 md:min-h-[568px] md:min-w-[720px] lg:min-w-[845px]">
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 lg:p-6">
        <div className="h-15 w-15 flex items-center rounded-full bg-subtle ">
          <FontAwesomeIcon
            icon={faKey}
            className="h-10 w-10 text-primary-500 lg:p-5"
          />
        </div>

        <div className="flex h-full w-full flex-col justify-between gap-6">
          <div className=" h3 flex justify-center font-bold text-neutral-900">
            Change your password
          </div>
          <div className="flex w-full flex-col justify-start gap-3">
            <div>
              <div className="body-5 text-high">Enter Old Password</div>
              <Input
                type="password"
                className="h-9 rounded-xl p-3"
                placeholder="Enter your old password"
              />
            </div>
            <div>
              <div className="body-5 text-high">Enter New Password</div>
              <Input
                type="password"
                className="h-9 rounded-xl p-3"
                placeholder="Enter your new password"
              />
              <div className="flex items-center text-medium">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="mr-1 h-4 w-4 text-medium"
                />
                The password must be at least 8 characters.
              </div>
            </div>
            <div>
              <div className="body-5 text-high">Confirm Password</div>
              <Input
                type="password"
                className="h-9 rounded-xl p-3"
                placeholder="Enter your new password"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-12">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    </DialogContent>
  );
}

function DrawerProfile(props: ProfilePreviewProps) {
  return (
    <DrawerContent className="flex flex-col gap-2 bg-white p-4">
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 lg:p-6">
        <div className="h-15 w-15 flex items-center rounded-full bg-subtle ">
          <FontAwesomeIcon
            icon={faKey}
            className="h-10 w-10 text-primary-500 lg:p-5"
          />
        </div>

        <div className="flex h-full w-full flex-col justify-between gap-6">
          <div className=" h3 flex justify-center font-bold text-neutral-900">
            Change your password
          </div>
          <div className="flex w-full flex-col justify-start gap-3">
            <div>
              <div className="body-5 text-high">Enter Old Password</div>
              <Input
                className="h-9 rounded-xl p-3"
                placeholder="Enter your old password"
              />
            </div>
            <div>
              <div className="body-5 text-high">Enter New Password</div>
              <Input
                className="h-9 rounded-xl p-3"
                placeholder="Enter your new password"
              />
              <div className="flex items-center text-medium">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="mr-1 h-4 w-4 text-medium"
                />
                The password must be at least 8 characters.
              </div>
            </div>
            <div>
              <div className="body-5 text-high">Confirm Password</div>
              <Input
                className="h-9 rounded-xl p-3"
                placeholder="Enter your new password"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-12">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    </DrawerContent>
  );
}
