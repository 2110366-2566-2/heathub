import { useState } from "react";
import { api } from "@/trpc/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingSVG from "./LoadingSVG";
import { cn } from "@/utils/tailwind-merge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ChatEventForm from "./ChatEventCreateForm";
import { type CreateFormInfo } from "./ChatEventCreateForm";
import { useMediaQuery } from "react-responsive";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
export default function ChatMessageBox({
  toUserID,
  setOpenChatEvent,
  userRole,
  onConfirm,
  isOpenChatEvent,
}: {
  toUserID: string;
  setOpenChatEvent: (open: boolean) => void;
  userRole: "participant" | "host";
  onConfirm: (form: CreateFormInfo) => void;
  isOpenChatEvent: boolean;
}) {
  const [message, setMessage] = useState("");
  const sendMessage = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
    },
  });

  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="bottom-0 z-10 mt-4 flex w-full flex-row items-center justify-center gap-2 bg-white px-6">
      {isMobile ? (
        <Drawer open={isOpenChatEvent} onOpenChange={setOpenChatEvent}>
          <DrawerTrigger className="cursor-pointer">
            <button
              className={cn("h-fit w-fit", {
                hidden: !(userRole === "host"),
              })}
              type="button"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={cn(
                  "h-6 w-6 rounded-full bg-primary-500 p-2 text-white",
                )}
              />
            </button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col items-center bg-white p-6">
            <ChatEventForm onConfirm={onConfirm} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpenChatEvent} onOpenChange={setOpenChatEvent}>
          <DialogTrigger className="cursor-pointer">
            <button
              className={cn("h-fit w-fit", {
                hidden: !(userRole === "host"),
              })}
              type="button"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={cn(
                  "h-6 w-6 rounded-full bg-primary-500 p-2 text-white",
                )}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center bg-white p-6">
            <ChatEventForm onConfirm={onConfirm} />
          </DialogContent>
        </Dialog>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage.mutate({
            content: message,
            toUserID: toUserID,
          });
        }}
        className="w-full"
      >
        <input
          type="text"
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full flex-1 rounded-xl bg-neutral-50 px-4 py-2 text-black"
        />
        {message !== "" && (
          <button
            type="submit"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 font-semibold text-white transition hover:bg-primary-600"
            disabled={sendMessage.isLoading}
          >
            {!sendMessage.isLoading ? (
              <FontAwesomeIcon icon={faPaperPlane} size="1x" />
            ) : (
              <LoadingSVG />
            )}
          </button>
        )}
      </form>
    </div>
  );
}
