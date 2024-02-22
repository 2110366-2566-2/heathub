"use client";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "./components/Card";
import {EventStatus} from "./components/Card";

export default function Page() {
  return (
    <div className="grow flex-col items-center gap-6 lg:flex xl:flex w-screen p-9">
      <Content/>
    </div>
  );
}

function Content() {
    const mockDate = new Date();
    const mockLocation = "Dream World, BKK";

    return (
      <div className="flex flex-col gap-2 w-full h-screen">
        <Tabs defaultValue="upcoming" className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                  <div className="flex flex-row">
                      <div className="relative flex items-center gap-3 w-full">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="h-7 w-7 text-secondary-400"
                            />
                        <TabsContent value="upcoming">
                          <div className="h2 font-extrabold text-primary-900">Upcoming Event</div>
                        </TabsContent>
                        <TabsContent value="completed">
                          <div className="h2 font-extrabold text-primary-900">Completed Event</div>
                        </TabsContent>
                      </div>
                      <TabsList defaultValue="upcoming" className="bg-neutral-100 max-md:hidden">
                          <TabsTrigger value="upcoming" className="h5 relative data-[state=active]:bg-invert">
                              Upcoming
                          </TabsTrigger>
                          <TabsTrigger value="completed" className="h5 data-[state=active]:bg-invert" >Completed</TabsTrigger>
                      </TabsList>
                  </div>
                  <div className="h5 lg:h4 text-medium">
                      Events displayed in chronological order by date and time.
                  </div>
              </div>
                <TabsList defaultValue="upcoming" className="bg-neutral-100 md:hidden">
                        <TabsTrigger value="upcoming" className="h5 relative data-[state=active]:bg-invert w-full">
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="h5 data-[state=active]:bg-invert w-full" >Completed</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="upcoming" className="border-none p-0 outline-none">
                <div className="flex flex-col gap-4">
                    <Card name="Faii" location={mockLocation} date={mockDate} status={EventStatus.NOTSTARTED}/>
                    <Card name="BoBo" location={mockLocation} date={mockDate} status={EventStatus.STARTED}/>
                    <Card name="halo" location={mockLocation} date={mockDate} status={EventStatus.STARTED}/>
                    <Card name="halo" location={mockLocation} date={mockDate} status={EventStatus.NOTSTARTED}/>
                </div>
            </TabsContent>
            <TabsContent value="completed" className="h-full flex-col border-none p-0 data-[state=active]:flex">
            <div className="flex flex-col gap-4">
                    <Card name="Faii" location={mockLocation} date={mockDate} status={EventStatus.WAITINGREVIEW}/>
                    <Card name="BoBo" location={mockLocation} date={mockDate} status={EventStatus.COMPLETED}/>
                    <Card name="halo" location={mockLocation} date={mockDate} status={EventStatus.COMPLETED}/>
                    <Card name="halo" location={mockLocation} date={mockDate} status={EventStatus.COMPLETED}/>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    );
  }