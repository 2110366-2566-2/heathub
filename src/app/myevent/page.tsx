"use client";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "./components/Card";
import {status} from "./components/Card";

export default async function Page() {
  return (
    <div className="grow flex-col items-center gap-6 lg:flex xl:flex w-screen p-9">
      <Content/>
    </div>
  );
}

function Content() {
    return (
      <div className="flex flex-col gap-2 w-full h-screen">
        <Tabs defaultValue="upcoming" className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row">
                    <div className="relative flex items-center gap-3 w-full">
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="h-8 w-8 text-secondary-400"
                        />
                    <div className="h2 font-bold text-primary-900">Upcoming Event</div>
                    </div>
                    <TabsList defaultValue="upcoming" className="bg-neutral-100">
                        <TabsTrigger value="upcoming" className="relative data-[state=active]:bg-invert">
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-invert" >Completed</TabsTrigger>
                    </TabsList>
                </div>
                <div className="h5 lg:h4 text-primary-700">
                    Events displayed in chronological order by date and time.
                </div>
            </div>
            <TabsContent value="upcoming" className="border-none p-0 outline-none">
                <div className="flex flex-col gap-4">
                    <Card name="Faii" status={status.NOTSTARTED}/>
                    <Card name="BoBo" status={status.STARTED}/>
                    <Card name="halo" status={status.STARTED}/>
                    <Card name="halo" status={status.NOTSTARTED}/>
                </div>
            </TabsContent>
            <TabsContent value="completed" className="h-full flex-col border-none p-0 data-[state=active]:flex">
            <div className="flex flex-col gap-4">
                    <Card name="Faii" status={status.WAITINGREVIEW}/>
                    <Card name="BoBo" status={status.COMPLETED}/>
                    <Card name="halo" status={status.COMPLETED}/>
                    <Card name="halo" status={status.COMPLETED}/>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    );
  }