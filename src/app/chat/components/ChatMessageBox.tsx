import { useState } from "react";
import { api } from "@/trpc/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingSVG from "./LoadingSVG";
import { cn } from "@/utils/tailwind-merge";
export default function ChatMessageBox({
  toUserID,
  setOpenChatEvent,
}: {
  toUserID: string;
  setOpenChatEvent: () => void;
}) {
  const [message, setMessage] = useState("");
  const sendMessage = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage.mutate({
          content: message,
          toUserID: toUserID,
        });
      }}
      className="bottom-0 z-10 mb-14 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-white px-14 max-lg:mb-6 max-lg:px-6"
    >
      <button className="h-fit w-fit" type="button" onClick={setOpenChatEvent}>
        <FontAwesomeIcon
          icon={faPlus}
          className={cn("h-6 w-6 rounded-full bg-primary-500 p-2 text-white")}
        />
      </button>
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
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
          ) : (
            <LoadingSVG />
          )}
        </button>
      )}
    </form>
  );
}
