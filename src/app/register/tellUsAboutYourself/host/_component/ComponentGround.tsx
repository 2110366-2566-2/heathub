'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegisterFormBox from "./RegisterFormBox";

export default function ComponentsGround() {

    const handleButtonClick = () => {
        return;
    }
    

    return (
        <div className="flex flex-col items-center gap-y-[24px]">
            <div className="text-primary-900 md:h1-bold h2-bold">Host tell us about yourself</div>
            <RegisterFormBox/>
            <Button className="bg-primary-500 text-white" variant="outline" onClick={()=>{handleButtonClick();}}>Next</Button>
        </div>
    )
}