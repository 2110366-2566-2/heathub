"use client";
import Image from "next/image";
import { Tag } from "@/app/_components/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEllipsisVertical, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  
type EventProps = {
    name: string;
    location?: string;
    date?: string;
    status?: status;
    image?: string;
};

export enum status {
    STARTED = "Event Started",
    NOTSTARTED  = "Not Started",
    WAITINGREVIEW = "Waiting for Review",
    COMPLETED = "Completed",
}  


export function Card(prop: EventProps) {
    const CardButton = () => {
        switch (prop.status) {
            case status.STARTED:
                return <Button variant="default" className="bg-primary-500 text-white">Finish Event</Button>
            case status.NOTSTARTED:
                return <Button variant="default" className="bg-error-default hover:bg-error-hover text-white">Cancel Event</Button>;
            case status.WAITINGREVIEW:
                return <Button variant="default" className="bg-primary-500 text-white">Give Review</Button>;
            case status.COMPLETED:
                return <Button variant="default" className="bg-primary-500 text-white">My Review</Button>;
            default:
                return <Button variant="default" className="bg-primary-500 text-white">Cancel Event</Button>;
        }
    }

    return (
        <div className="flex flex-row gap-4 items-center h-18 w-full bg-white p-3 rounded-xl">
            <div className=" w-14 h-14 rounded-full relative overflow-hidden">
                <Image src="/images/discover/mock-profile/mock-1.jpg" fill objectFit="cover" alt="logo" />
            </div>
            <div className="flex-1">
                <div className="flex flex-row gap-2 items-center">
                    <h4 className="h4 font-bold">{prop.name}</h4>
                    <Tag className="small" variant="outline" size="sm">{prop.status}</Tag>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1 items-center">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="h-3 w-3 text-primary-500"
                        />
                        {/* <h6 className="h6 text-primary-900">{prop.location}</h6> */}
                        <h6 className="h6 text-primary-900">Dream World, BKK</h6>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="h-3 w-3 text-medium"
                        />
                        <h6 className="h6 text-medium font-light">16 Feb 2024 at 18:30</h6>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-1 items-center">
                <CardButton/>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <FontAwesomeIcon
                        icon= {faEllipsisVertical}
                        className="h-6 w-6 text-medium"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem className="hover:bg-neutral-100">Report Event</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-100">Go To Chat</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}