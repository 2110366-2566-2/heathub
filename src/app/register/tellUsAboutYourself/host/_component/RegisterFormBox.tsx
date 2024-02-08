'use client'

import * as React from "react"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterFormBox() {
  

  return (
    <Card className="w-[845px] h-[496px] bg-white border-solid border-primary-500 rounded-3xl justify-center">
      <CardContent className="w-full h-full p-[24px]">
        <form className="h-full">
            <div className="flex flex-row relative h-full">
              <div className="flex flex-row w-[494px] relative">
                <div className="w-">
                  picture
                </div>
                <div className="grid w-[309px] items-center gap-4 right-0 absolute">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Firstname">Firstname</Label>
                    <Input id="Firstname" placeholder="Enter your firstname" />
                    <Label htmlFor="Lastname">Lastname</Label>
                    <Input id="Lastname" placeholder="Enter your Lastname" />
                    <Label htmlFor="AKA">AKA</Label>
                    <Input id="AKA" placeholder="Enter your aka" />
                    <Label htmlFor="Bio">Bio</Label>
                    <Input id="Bio" placeholder="Type your massage here" />
                    <Label htmlFor="Date of birth">Date of birth</Label>
                    <Input id="Date of birth" placeholder="Select date" />
                  </div>
                </div>
              </div>

              <div className="left-0 w-[62px] h-full flex justify-center">
                <div className="w-[0.5px] h-full bg-primary-500"></div>
              </div>

              <div className="absolute right-0 w-[241px] h-full">
                asdf
              </div>
            </div>
        </form>
      </CardContent>
    </Card>
  )
}


