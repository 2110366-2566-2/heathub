import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { cn } from "@/utils/tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "md", ...props }, ref) => {


    return (
      <input
        type={type}
        className={cn(
          "bg-neutral-100 text-body5 ring-offset-neutral-100 flex h-10 w-full rounded-xl px-3 py-2 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-100 file:text-sm file:font-medium file:text-invert placeholder:text-placeholder invalid:border-red-500 invalid:bg-red-100 invalid:text-red-500 hover:file:bg-neutral-100 focus-visible:bg-white focus-visible:outline-none focus-visible:ring invalid:focus-visible:ring focus-visible:ring-primary-100 invalid:focus-visible:ring-red-200 focus-visible:ring-offset-0 invalid:focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-disable disabled:opacity-90",
          {
            "py-3": size === "lg",
            "py-1": size === "sm",
            "h-12": size === "lg",
            "h-8": size === "sm",
            "text-body6": size === "sm",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";


export { Input };
