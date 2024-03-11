"use client";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "./components/Card";
import { EventStatus } from "./components/Card";
import { api } from "@/trpc/react";
import { useState } from "react";
import { type myEventProps } from "./types";
import { type EventProps } from "./components/Card";
import { parseEventStatus, parseTabValue } from "./utils";

export default function Page() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [tabValue, setTabValue] = useState<
    "upcoming" | "completed" | undefined
  >("upcoming");

  api.event.myEvent.useQuery(
    {
      status: tabValue,
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        const _events: EventProps[] = data.map((event: myEventProps) => ({
          id: event.id,
          userID: role == "participant" ? event.host.id : event.participant.id,
          name: role == "participant" ? event.host.aka : event.participant.aka,
          location: event.location,
          date: event.startTime,
          status: parseEventStatus(event.startTime, event.status),
          image:
            role == "participant"
              ? event.host.profileImageURL
              : event.participant.profileImageURL,
          detail: event.description,
        }));
        setEvents(_events);
        console.log(_events);
      },
    },
  );

  const [role, setRole] = useState("host");

  return (
    <div className="w-screen grow flex-col items-center gap-6 p-9 lg:flex xl:flex">
      <div className="flex h-screen w-full flex-col gap-2">
        <Tabs
          defaultValue="upcoming"
          className="flex w-full flex-col gap-6"
          onValueChange={(value) => setTabValue(parseTabValue(value))}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row">
                <div className="relative flex w-full items-center gap-3">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="h-7 w-7 text-secondary-500"
                  />
                  <TabsContent value="upcoming">
                    <div className="h2 font-extrabold text-primary-900">
                      Upcoming Event
                    </div>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="h2 font-extrabold text-primary-900">
                      Completed Event
                    </div>
                  </TabsContent>
                </div>
                <TabsList
                  defaultValue="upcoming"
                  className="bg-neutral-100 max-md:hidden"
                >
                  <TabsTrigger
                    value="upcoming"
                    className="h5 relative text-medium  data-[state=active]:bg-secondary-500 data-[state=active]:text-white"
                  >
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="h5 text-medium  data-[state=active]:bg-secondary-500 data-[state=active]:text-white"
                  >
                    Completed
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="h5 lg:h4 text-primary-700">
                Events displayed in chronological order by date and time.
              </div>
            </div>
            <TabsList
              defaultValue="upcoming"
              className="bg-neutral-100 md:hidden"
            >
              <TabsTrigger
                value="upcoming"
                className="h5 relative w-full text-medium  data-[state=active]:bg-secondary-500 data-[state=active]:text-white"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="h5 w-full text-medium  data-[state=active]:bg-secondary-500 data-[state=active]:text-white"
              >
                Completed
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="upcoming"
            className="border-none p-0 outline-none"
          >
            <div className="flex flex-col gap-4">
              {events.map((event) => {
                return (
                  <Card
                    key={event.id}
                    id={event.id}
                    userID={event.userID}
                    name={event.name}
                    image={event.image ?? ""}
                    location={event.location}
                    date={event.date}
                    status={event.status}
                    detail={event.detail ?? ""}
                    isVerified
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent
            value="completed"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex flex-col gap-4">
              {events.map((event) => {
                return (
                  <Card
                    key={event.id}
                    id={event.id}
                    userID={event.userID}
                    name={event.name}
                    image={event.image}
                    location={event.location}
                    date={event.date}
                    status={event.status}
                    detail={event.detail}
                    isVerified
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
