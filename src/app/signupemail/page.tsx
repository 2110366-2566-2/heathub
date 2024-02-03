"use client";
import { signUpEmailCheck } from "@/action/auth";
import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignUpEmail(){
    // const router = useRouter()
    const { data, isSuccess } = api.auth.getAllUsers.useQuery();
    const { data: userData } = api.auth.me.useQuery();
    // const [error, setError] = useState<string | null>(null);
    const checkEmail = api.auth.isExistEmail.useMutation();

    useEffect(() => {
        if (userData) {
          redirect("/");
        }
      }, [userData]);
    
    const formRef = useRef<HTMLFormElement>(null);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) {
            return;
        }

        const formData = new FormData(formRef.current);
        let err = await signUpEmailCheck(formData);
        if (!err) {
            
            const input = formData.get("email") as string
            const isEmailExist = await checkEmail.mutateAsync({email:input})
            if (!isEmailExist){
                // router.push("/signupdetail")
                redirect("/signupdetail");//cant redirect
            }else{
                err = "Already Exist Email"
            }
        }
        // setError(err)
    };
    
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1>Create Your Account</h1>
    
            {isSuccess ? (
              data.map((user) => <p key={user.id}>{user.aka}</p>)
            ) : (
              <p>loading</p>
            )}
    
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-black"
              ref={formRef}
            >
              <input
                className="rounded-md p-2"
                type="text"
                name="email"
                placeholder="email"
              />
              <input
                className="rounded-md p-2"
                type="password"
                name="password"
                placeholder="password"
              />
              <button
                type="submit"
                className="rounded-md bg-violet-500 p-4 text-white"
              >
                Sign up
              </button>
            </form>
          </div>
        </main>
      );
    }
    