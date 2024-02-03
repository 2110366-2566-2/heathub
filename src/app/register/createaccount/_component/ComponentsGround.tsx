'use client'

import { useEffect, useState } from "react";
import EmailPasswordBox from "./EmailPasswordBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ComponentsGround() {
    const [isPasswordMatch, setPasswordMatch] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);

    useEffect(() => {
        console.log(isPasswordMatch? "password match": "password don't match");
      }, [isPasswordMatch]);

    const router = useRouter();
    const handleButtonClick = () => {
        if (!isPasswordMatch) {
            console.log("password don't match");
            return;
        } else if (!isPasswordValid) {
            console.log("invalid password");
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
            <EmailPasswordBox setPasswordMatch={setPasswordMatch} setPasswordValid={setPasswordValid}/>
            <Button variant="outline" onClick={()=>{handleButtonClick()}}>Next</Button>
        </div>
    )
}