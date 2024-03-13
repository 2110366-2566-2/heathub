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

const googlelib = ["places"] as Library[];
export interface CreateFormInfo {
  location: string;
  price: number;
  description?: string;
  startTime: Date;
  endTime: Date;
}

export default function ChatEventForm({
  onConfirm,
}: {
  onConfirm: (form: CreateFormInfo) => void;
}) {
  const formSchema = z.object({
    location: z.string().min(1, {
      message: "location is empty",
    }),
    price: z.coerce.number(),
    beginDate: z.date(),
    endDate: z.date(),
    startTime: z.string({ required_error: "Should add start time" }),
    endTime: z.string({ required_error: "Should add end time" }),
  });
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
    const [startHours, startMinutes] = values.startTime
      .split(":")
      .map((e) => parseInt(e));
    const [endHours, endMinutes] = values.endTime
      .split(":")
      .map((e) => parseInt(e));
    let startTime = values.beginDate;
    let endTime = values.endDate;
    startTime.setHours(startHours ?? 0);
    startTime.setMinutes(startMinutes ?? 0);
    endTime.setHours(endHours ?? 23);
    endTime.setMinutes(endMinutes ?? 59);
    onConfirm({
      location: values.location,
      price: values.price,
      startTime: startTime,
      endTime: endTime,
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
                <FormItem className="flex h-fit flex-1 flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        className={cn(
                          "justify-start w-full border-primary-300 bg-neutral-100 text-left font-normal hover:bg-neutral-200",
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
                <FormItem className="flex h-fit flex-1 flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        className={cn(
                          "justify-start w-full border-primary-300 bg-neutral-100 text-left font-normal hover:bg-neutral-200",
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
                    className="order-0 appearance-none border-0 bg-neutral-100 text-primary-500"
                    min={0}
                    value={field.value ?? ""}
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
