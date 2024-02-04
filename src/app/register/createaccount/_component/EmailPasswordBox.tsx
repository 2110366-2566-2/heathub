'use client'

import * as React from "react"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmailPasswordBoxProps {
  setPasswordMatch: (isValid: boolean) => void
}

const checkConfirmPassword = function(props: EmailPasswordBoxProps) {
  const password = document.getElementById('Password') as HTMLInputElement;
  const confirmPassword = document.getElementById('Confirm Password') as HTMLInputElement;
  if (!!password && !!confirmPassword) {
    if (password.value == confirmPassword.value) {
      (document.getElementById('message') as HTMLInputElement).style.color = 'green';
      (document.getElementById('message') as HTMLInputElement).innerHTML = 'matching';
      props.setPasswordMatch(true);
    } else {
      (document.getElementById('message') as HTMLInputElement).style.color = 'red';
      (document.getElementById('message') as HTMLInputElement).innerHTML = 'not matching';
      props.setPasswordMatch(false);
    }
  }
}


export default function EmailPasswordBox(props: EmailPasswordBoxProps) {

  return (

    <Card className="w-[633px] h-[388px] px-[106.5px] pt-[20px]">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" placeholder="Enter your Email" />
              <Label htmlFor="Password">Password</Label>
              <Input id="Password" placeholder="Enter your password" />
              <div className="text-sm">
                The password must be at least 8 characters
              </div>
              <Label htmlFor="Confirm Password">Confirm Password</Label>
              <Input id="Confirm Password" placeholder="Enter your password"
              onKeyUp={()=>checkConfirmPassword(props)}/>
              <span id='message'></span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
