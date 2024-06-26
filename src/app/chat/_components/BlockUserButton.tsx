"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function BlockUserButton({ userID }: { userID: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const utils = api.useUtils();
  const blockUser = api.me.blockUserByID.useMutation({
    onSuccess: async () => {
      toast({
        title: "User blocked",
        description: "User has been blocked successfully",
      });
      await utils.chat.recentChats.invalidate();
      router.push("/chat");
    },
    onError: (error) => {
      toast({
        title: "Failed to block user",
        description: error.message,
        variant: "error",
      });
    },
  });

  return (
    <button
      type="button"
      className="flex h-6 w-6 items-center"
      onClick={() =>
        blockUser.mutate({
          blockUserID: userID,
        })
      }
    >
      <FontAwesomeIcon
        icon={faBan}
        className="aspect-square text-secondary-500"
        size="lg"
      />
    </button>
  );
}
