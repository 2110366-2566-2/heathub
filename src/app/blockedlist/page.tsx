"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface BlockedUserData {
  userID: string;
  blockedUserID: string;
  blockUser: {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    role: "host" | "participant" | "admin";
    id: string;
    aka: string;
    bio: string | null;
    dateOfBirth: Date | null;
    profileImageURL: string;
    balance: number;
  };
}
interface Blockprops {
  id: string;
  name: string;
  image: string;
}

export default function BlockedList() {
  const { data } = api.me.myBlockedUsers.useQuery({}, {});

  return (
    <div className="flex w-full flex-col gap-y-6 p-9">
      <div className="flex w-full flex-row items-center gap-x-3">
        <Link href={"/profile"}>
          <FontAwesomeIcon
            className="h-6 text-high hover:cursor-pointer hover:text-black"
            icon={faAngleLeft}
          />
        </Link>
        <div className="h3 font-bold text-high">Blocked Users</div>
      </div>
      <div className="flex w-full flex-col">
        {data ? (
          (data as BlockedUserData[]).map((item: BlockedUserData, _index) => (
            <BlockedUsers
              id={item.blockedUserID}
              name={item.blockUser.firstName + " " + item.blockUser.lastName}
              image={item.blockUser.profileImageURL}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function BlockedUsers(props: Blockprops) {
  let { id, name, image } = props;
  const { toast } = useToast();
  const utils = api.useUtils();
  const unBlock = api.me.unBlockUserByID.useMutation({
    onSuccess: () => {
      toast({
        title: "User unblocked",
        description: "User unblocked successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to unblock user",
        description: error.message,
        variant: "error",
      });
    },
  });

  const handleUnBlock = async (id: string) => {
    try {
      await unBlock.mutateAsync({ blockUserID: id });
      await utils.me.myBlockedUsers.invalidate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-16 w-full flex-row items-center gap-x-4 rounded-lg p-3 hover:bg-neutral-50">
      <div className="flex h-11 w-11 items-center justify-center">
        <div className="relative h-11 w-11">
          <Image
            className="h-full items-center justify-center rounded-full"
            src={image}
            width={100}
            height={100}
            alt="profilePic"
          />
        </div>
      </div>
      <div className="flex h-9 w-full flex-row items-center gap-x-1">
        <div className="flex h-full w-full flex-col justify-center">
          <div className="h4 line-clamp-1 font-bold ">{name}</div>
        </div>
        <Button
          variant="default"
          className="bg-secondary-500 text-white hover:bg-secondary-600"
          onClick={() => handleUnBlock(id)}
        >
          UnBlock
        </Button>
      </div>
    </div>
  );
}
