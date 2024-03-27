import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { api } from "@/trpc/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ReportEventModalProps {
  eventID: number;
  children: React.ReactNode;
}

export function ReportEventModal(props: ReportEventModalProps) {
  const { children, eventID } = props;
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const createReport = api.report.createReport.useMutation({
    onSuccess: () => {
      setOpen(false);
      toast({
        title: "Report submitted",
        description:
          "Your report has been submitted and will be reviewed by our team",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred",
        description: error.message,
        variant: "error",
      });
    },
  });

  const formSchema = z.object({
    title: z.string({ required_error: "Please select a reason" }),
    details: z.string({ required_error: "Please provide details" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createReport.mutate({
      title: values.title,
      details: values.details,
      eventID: eventID,
    });
  }

  return (
    <Dialog
      onOpenChange={() => {
        form.reset();
      }}
      open={open}
    >
      <DialogTrigger onClick={() => setOpen(true)}>{children}</DialogTrigger>
      <DialogContent className="rounded-3xl bg-white">
        <Form {...form}>
          {" "}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle className="items-begin flex flex-col gap-1">
                <h3 className="h3 flex flex-1 font-extrabold text-primary-800">
                  Report
                </h3>
                <div className="h6 font-normal text-medium">
                  Please note that your report has been escalated to our
                  administration team. Should the provided reason and evidence
                  meet our criteria for cancellation, the event will be promptly
                  canceled, and you will receive a refund accordingly
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="flex w-full flex-col gap-3">
              <div>What type of issue are you reporting?</div>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    defaultValue="option-one"
                    onChange={(e) => field.onChange(e)}
                  >
                    <Label
                      htmlFor="option-one"
                      className="flex w-full cursor-pointer items-center justify-between rounded-md bg-neutral-50 px-4 py-2"
                    >
                      <div className="flex w-full cursor-pointer flex-col">
                        <div className="h6 font-bold ">Abuse & Harrasment</div>
                        <div className="text-sm text-medium ">
                          Discrimination based on race, gender, sexual
                          orientation, or other factors.
                        </div>
                      </div>
                      <RadioGroupItem value="abuse" id="option-one" />
                    </Label>
                    <Label
                      htmlFor="option-two"
                      className="flex w-full cursor-pointer items-center justify-between rounded-md bg-neutral-50 px-4 py-2"
                    >
                      <div className="flex w-full cursor-pointer flex-col">
                        <div className="h6 font-bold">No-Show Hosts</div>
                        <div className="text-sm text-medium">
                          Hosts not attending their own events without prior
                          notice, leaving participants waiting and potentially
                          exposed to risks of harassment or abuse from others.
                          Events being cancelled by hosts at the last minute
                          without explanation, disrupting participants&apos;
                          plans and potentially causing financial loss or
                          inconvenience.
                        </div>
                      </div>
                      <RadioGroupItem value="no-show" id="option-two" />
                    </Label>
                    <FormMessage className="text-red-500" />
                  </RadioGroup>
                )}
              />
              <div>Details</div>
              <FormField
                name="details"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Textarea
                      placeholder="Give us more details"
                      className="scrollbar-hide text-md w-full resize-none text-primary-400 focus-visible:ring-0"
                      {...field}
                    />
                    <FormMessage className="text-red-500" />
                  </>
                )}
              />
            </div>
            <DialogFooter className="flex flex-row justify-end">
              <Button
                variant="outline"
                className="h5 border-primary-500 text-primary-500"
                onClick={() => setOpen(false)}
              >
                Back To Event
              </Button>
              <Button
                variant="default"
                className="bg-primary-500 text-white"
                type="submit"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
