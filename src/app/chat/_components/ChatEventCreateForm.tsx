"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/tailwind-merge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useLoadScript } from "@react-google-maps/api";
import { PlacesAutocomplete } from "./AutoComplete";
import { type Library } from "@googlemaps/js-api-loader";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const googlelib = ["places"] as Library[];
export interface CreateFormInfo {
  location: string;
  price: number;
  description?: string;
  startTime: Date;
  endTime: Date;
}

function addTimeToDate(d1: Date, d2: Date, t1: string, t2: string) {
  const [startHours, startMinutes] = t1.split(":").map((e) => parseInt(e));
  const [endHours, endMinutes] = t2.split(":").map((e) => parseInt(e));
  let startTime = d1;
  let endTime = d2;
  startTime.setHours(startHours ?? 0);
  startTime.setMinutes(startMinutes ?? 0);
  endTime.setHours(endHours ?? 23);
  endTime.setMinutes(endMinutes ?? 59);
  return { startTime, endTime };
}

export default function ChatEventForm({
  onConfirm,
}: {
  onConfirm: (form: CreateFormInfo) => void;
}) {
  const formSchema = z
    .object({
      location: z.string().min(1, {
        message: "location is empty",
      }),
      price: z.coerce.number(),
      beginDate: z.date(),
      endDate: z.date(),
      description: z.string(),
      startTime: z.string({ required_error: "start time" }),
      endTime: z.string({ required_error: "end time" }),
    })
    .refine(
      (val) => {
        const { startTime, endTime } = addTimeToDate(
          val.beginDate,
          val.endDate,
          val.startTime,
          val.endTime,
        );
        return startTime < endTime && startTime > new Date();
      },
      {
        message: "invalid startTime",
        path: ["endDate"],
      },
    );

  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBzAKU-lzdnputUmRhYdRF3KrpMoHHmr4g",
    libraries: googlelib,
  });

  if (!isLoaded) return <div>Loading...</div>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    //parse price to float
    const { startTime, endTime } = addTimeToDate(
      values.beginDate,
      values.endDate,
      values.startTime,
      values.endTime,
    );
    onConfirm({
      location: values.location,
      price: values.price,
      startTime: startTime,
      endTime: endTime,
      description: values.description,
    });
  }

  return (
    <Form {...form}>
      {" "}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col items-center p-2"
      >
        <div className="flex w-full flex-col gap-4">
          <div className=" flex flex-col">
            <div className="h3 font-bold text-primary-800">Create Event</div>
            <div className="small text-medium">
              Fill the following details to create an event and this event will
              be show in your chat room.
            </div>
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <PlacesAutocomplete
                      setSelected={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
          <div className="flex w-full flex-row items-start justify-center gap-3">
            <FormField
              control={form.control}
              name="beginDate"
              render={({ field }) => (
                <FormItem className="flex h-fit w-full flex-1 flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        className={cn(
                          "w-full justify-start border-primary-300 bg-neutral-100 text-left font-normal hover:bg-neutral-200",
                          !field?.value
                            ? "text-placeholder"
                            : "text-primary-500",
                        )}
                      >
                        <CalendarIcon className={cn("mr-2 h-4 w-4 ")} />
                        {field.value ? (
                          format(field.value, "LLL dd, y")
                        ) : (
                          <span>Pick a begin date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto bg-white p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < yesterday || date > form.getValues("endDate")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex h-fit w-fit flex-col ">
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      type="time"
                      className="w-fit appearance-none border-0 bg-neutral-100 text-primary-500 hover:cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-row items-start justify-center gap-3">
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex h-fit w-full flex-1 flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        className={cn(
                          "w-full justify-start border-primary-300 bg-neutral-100 text-left font-normal hover:bg-neutral-200",
                          !field?.value
                            ? "text-placeholder"
                            : "text-primary-500",
                        )}
                      >
                        <CalendarIcon className={cn("mr-2 h-4 w-4 ")} />
                        {field.value ? (
                          format(field.value, "LLL dd, y")
                        ) : (
                          <span>Pick an end date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto bg-white p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) =>
                          date < yesterday ||
                          date < form.getValues("beginDate") ||
                          form.getValues("beginDate") === undefined
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex h-fit w-fit flex-col ">
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      type="time"
                      className="w-fit appearance-none border-0 bg-neutral-100 text-primary-500 hover:cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Price"
                    {...field}
                    type="number"
                    autoComplete="off"
                    min={0}
                    className="order-0 appearance-none border-0 bg-neutral-100 text-primary-500"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="scrollbar-hide text-md w-full resize-none text-primary-400 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex w-fit gap-3 self-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Event</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
