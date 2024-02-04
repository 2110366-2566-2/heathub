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
        checkValidPassword();
    }, [isPasswordMatch]);

    const checkValidPassword = function() {
        const password = document.getElementById('Password') as HTMLInputElement;
        if (!!password) {
            if (password.value.length >= 8) {
                setPasswordValid(true);
                console.log(`password: ${password.value}`)
            } else {
                setPasswordValid(false);
            }
        }
    }

    const router = useRouter();
    const handleButtonClick = () => {
        if (!isPasswordMatch) {
            console.log("password don't match");
            return;
        } else if (!isPasswordValid) {
            (document.getElementById('message') as HTMLInputElement).style.color = 'red';
            (document.getElementById('message') as HTMLInputElement).innerHTML = 'password invalid';
            console.log("invalid password");
        } else if (false) {
            (document.getElementById('message') as HTMLInputElement).style.color = 'red';
            (document.getElementById('message') as HTMLInputElement).innerHTML = 'Email invalid';
            console.log("invalid email");
        } else if (false) {
            (document.getElementById('message') as HTMLInputElement).style.color = 'red';
            (document.getElementById('message') as HTMLInputElement).innerHTML = 'this email is already have an account';
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
            <EmailPasswordBox setPasswordMatch={setPasswordMatch}/>
            <Button variant="outline" onClick={()=>{handleButtonClick()}}>Next</Button>
        </div>
    )
}