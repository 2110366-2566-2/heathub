"use client";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "./components/Card";
import { EventStatus } from "./components/Card";

export default function Page() {
  return (
    <div className="w-screen grow flex-col items-center gap-6 p-9 lg:flex xl:flex">
      <Content />
    </div>
  );
}

function Content() {
  const mockDate = new Date();
  const mockLocation = "Dream World, BKK";
  const mockImage = "/images/discover/mock-profile/mock-1.jpg";
  const mockDetail = "This is a detail of the event";

  return (
    <div className="flex h-screen w-full flex-col gap-2">
      <Tabs defaultValue="upcoming" className="flex w-full flex-col gap-6">
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
                  className="h5 relative data-[state=active]:bg-secondary-500  data-[state=active]:text-white text-medium"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="h5 data-[state=active]:bg-secondary-500  data-[state=active]:text-white text-medium"
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
              className="h5 relative w-full data-[state=active]:bg-secondary-500  data-[state=active]:text-white text-medium"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h5 w-full data-[state=active]:bg-secondary-500  data-[state=active]:text-white text-medium"
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="upcoming" className="border-none p-0 outline-none">
          <div className="flex flex-col gap-4">
            <Card
              name="Faii"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.NOTSTARTED}
              detail={mockDetail}
              isVerified
            />
            <Card
              name="BoBo"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.STARTED}
            />
            <Card
              name="halo"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.STARTED}
            />
            <Card
              name="halo"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.NOTSTARTED}
            />
          </div>
        </TabsContent>
        <TabsContent
          value="completed"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <div className="flex flex-col gap-4">
            <Card
              name="Faii"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.WAITINGREVIEW}
            />
            <Card
              name="BoBo"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.COMPLETED}
            />
            <Card
              name="halo"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.COMPLETED}
            />
            <Card
              name="halo"
              image={mockImage}
              location={mockLocation}
              date={mockDate}
              status={EventStatus.COMPLETED}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
