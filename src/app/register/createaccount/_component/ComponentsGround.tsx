'use client'

import { useEffect, useState } from "react";
import EmailPasswordBox from "./EmailPasswordBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ComponentsGround() {
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);

    useEffect(() => {
        console.log(isPasswordValid? "password match": "password don't match");
      }, [isPasswordValid]);

    const router = useRouter();
    const handleButtonClick = () => {
        if (!isPasswordValid) {
            console.log("invalid password");
            return;
        } else if (false) {
            console.log("invalid email");
        } else if (false) {
            console.log("this email is already have an account");
        } else {
            console.log("-> tell us about yourself");
            router.push("/register/tellUsAboutYourself");
            return;
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Create your account</h1>
            <EmailPasswordBox setValid={setPasswordValid}/>
            <Button variant="outline" onClick={()=>{handleButtonClick()}}>Next</Button>
        </div>
    )
}