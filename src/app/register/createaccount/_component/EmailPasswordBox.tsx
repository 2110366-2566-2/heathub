'use client'

import * as React from "react"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmailPasswordBoxProps {
  setPasswordMatch: (isMatch: boolean) => void,
  setPasswordValid: (isValid: boolean) => void,
  setEmailValid: (isValid: boolean) => void,
  setEmailAlreadyReg: (isValid: boolean) => void
}

export default function EmailPasswordBox(props: EmailPasswordBoxProps) {
  
  const checkConfirmPassword = (props: EmailPasswordBoxProps) => {
    const password = document.getElementById('Password') as HTMLInputElement;
    const confirmPassword = document.getElementById('Confirm Password') as HTMLInputElement;
    if (!!confirmPassword && !!password && confirmPassword.value != "") {
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
  
  const checkValidPassword = (props: EmailPasswordBoxProps) => {
    const password = document.getElementById('Password') as HTMLInputElement;
    if (!!password) {
        if (password.value.length >= 8) { // add additional condition here
            props.setPasswordValid(true);
        } else {
          props.setPasswordValid(false);
        }
    }
  }
  
  const checkValidEmail = (props: EmailPasswordBoxProps) => {
    const email = document.getElementById('Email') as HTMLInputElement;
    if (!!email) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.value.match(validRegex)) { // add condition here
            props.setEmailValid(true);
        } else {
            props.setEmailValid(false);
        }

        if (true) { // add condition here
          props.setEmailAlreadyReg(true);
        } else {
          props.setEmailAlreadyReg(false);
        }
    }
  }

  return (
    <Card className="w-[633px] h-[388px] px-[106.5px] pt-[20px]">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" placeholder="Enter your Email" 
              onKeyUp={()=>{checkValidEmail(props)}}/>
              <Label htmlFor="Password">Password</Label>
              <Input id="Password" placeholder="Enter your password" 
              onKeyUp={()=>{checkConfirmPassword(props)
                            checkValidPassword(props)}}/>
              <div className="text-sm">
                The password must be at least 8 characters
              </div>
              <Label htmlFor="Confirm Password">Confirm Password</Label>
              <Input id="Confirm Password" placeholder="Enter your password"
              onKeyUp={()=>{checkConfirmPassword(props)
                            checkValidPassword(props)}}/>
              <span id='message'></span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
