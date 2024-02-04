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
    <Card className="w-[845px] h-[496px] p-[24px]">
      <CardContent>
        <form>
            <div className="flex flex-row">
                <div className="grid w-full items-center">
                    picture
                </div>
                <div className="grid w-full items-center gap-4">
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
        </form>
      </CardContent>
    </Card>
  )
}


