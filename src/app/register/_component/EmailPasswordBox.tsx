'use client'

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const checkConfirm = function() {
  const password = document.getElementById('Password') as HTMLInputElement;
  const confirmPassword = document.getElementById('Confirm Password') as HTMLInputElement;
  if (!!password && !!confirmPassword) {
    if (password.value == confirmPassword.value) {
      (document.getElementById('message') as HTMLInputElement).style.color = 'green';
      (document.getElementById('message') as HTMLInputElement).innerHTML = 'matching';
    } else {
      (document.getElementById('message') as HTMLInputElement).style.color = 'red';
      (document.getElementById('message') as HTMLInputElement).innerHTML = 'not matching';
    }
  }
}

export default function EmailPasswordBox() {
  const [isPasswordValid, setPasswordValid] = React.useState(false);

  return (

    <Card className="w-[633px] h-[388px] px-[106.5px] pt-[20px]">
      {/* <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader> */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" placeholder="Enter your Email" />
              <Label htmlFor="Password">Password</Label>
              <Input id="Password" placeholder="Enter your password" />
              <Label htmlFor="Confirm Password">Confirm Password</Label>
              <Input id="Confirm Password" placeholder="Enter your password" onKeyUp={()=>checkConfirm()}/>
              <span id='message'></span>
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Password">Password</Label>
              <Select>
                <SelectTrigger id="Password">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}
