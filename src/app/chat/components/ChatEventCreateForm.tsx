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

const googlelib = ["places"] as Library[];
export interface CreateFormInfo {
  location: string;
  price: number;
  description?: string;
  startTime: Date;
  endTime: Date;
}
export default function ChatEventForm({
  isOpen,
  onConfirm,
}: {
  isOpen: boolean;
  onConfirm: (form: CreateFormInfo) => void;
}) {
  const formSchema = z.object({
    location: z.string().min(1, {
      message: "location is empty",
    }),
    price: z.coerce.number(),
    date: z.object({
      from: z.date(),
      to: z.date().optional(),
    }),
    time: z.string({ required_error: "Should add time" }),
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
    const [hours, minutes] = values.time.split(":").map((e) => parseInt(e));
    let startTime = values.date.from;
    let endTime = values.date.to ?? values.date.from;
    startTime.setHours(hours ?? 0);
    startTime.setMinutes(minutes ?? 0);
    endTime.setHours(hours ?? 23);
    endTime.setMinutes(minutes ?? 59);
    onConfirm({
      location: values.location,
      price: values.price,
      startTime: startTime,
      endTime: endTime,
    });
  }

  return (
    isOpen && (
      <Form {...form}>
        {" "}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-2 flex h-fit w-fit
        flex-col
items-center
      justify-center
space-y-8
        self-end
         rounded-md border border-neutral-200 bg-white p-6 drop-shadow-md"
        >
          <div className="flex w-full max-w-[376px] flex-col gap-4">
            <div className="flex flex-col">
              <div className="h3 font-bold text-primary-800">Create Event</div>
              <div className="small text-medium">
                Fill the following details to create an event and this event
                will be show in your chat room.
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex w-full flex-row items-start justify-center gap-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex h-fit flex-1 flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full  justify-start border-primary-300 bg-white text-left font-normal hover:bg-white",
                            !field && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field?.value?.from ? (
                            field?.value?.to ? (
                              <>
                                {format(field?.value?.from, "LLL dd, y")} -{" "}
                                {format(field?.value?.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto bg-white p-0"
                        align="start"
                      >
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field?.value?.from}
                          selected={field?.value}
                          onSelect={field?.onChange}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex h-fit w-fit flex-col ">
                    <FormControl>
                      <Input
                        onChange={field.onChange}
                        type="time"
                        className="w-fit  appearance-none text-primary-500 hover:cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
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
                      className="appearance-none text-primary-500"
                      min={0}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-fit gap-3 self-end">
              <Button type="button">Cancel</Button>
              <Button type="submit">Create Event</Button>
            </div>
          </div>
        </form>
      </Form>
    )
  );
}
