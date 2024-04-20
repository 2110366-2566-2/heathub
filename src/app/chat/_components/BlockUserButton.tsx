"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

export function BlockUserButton({ userID }: { userID: string}) {
    const { toast } = useToast();
    const blockUser = api.me.blockUserByID.useMutation(
        {
            onSuccess: () => {
                toast({title: "User blocked", description: "User has been blocked successfully"})
            },
            onError: (error) => {
                toast({title: "Failed to block user", description: error.message, variant: "error"})
            }
        }
    )

    return (<button
        type="button"
        className="w-6 h-6 flex items-center"
        onClick={() => blockUser.mutate({
            blockUserID: userID
        })}
    >
        <FontAwesomeIcon
            icon={faBan}
            className="text-secondary-500 aspect-square"
            size="lg"
        />
    </button>)
}