'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegisterFormBox from "./RegisterFormBox";

export default function ComponentsGround() {
    

    return (
        <div className="flex flex-col items-center">
            <h1>Host tell us about yourself</h1>
            <RegisterFormBox/>
        </div>
    )
}