"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  rejectReason: z.string().min(1, {
    message: "Reason must be at least 1 characters.",
  }),
});
export default function RejectedRequestModal({
  rejectOnClick,
}: {
  rejectOnClick: (details: string) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await rejectOnClick(data.rejectReason);
  }

  return (
    <Dialog>
      <DialogTrigger className="h5  flex h-full w-full flex-row items-center justify-items-center space-x-1 bg-transparent text-neutral-500 hover:bg-transparent">
        <FontAwesomeIcon icon={faBan} width={20} height={20} />
        <span>Reject</span>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Why you reject this request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="rejectReason"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type your rejected reason here"
                      className="scrollbar-hide w-full resize-none focus-visible:ring-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end gap-x-2">
              <DialogClose asChild>
                <Button className="min-w-24 border bg-white text-medium ">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="min-w-24 " type="submit">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
