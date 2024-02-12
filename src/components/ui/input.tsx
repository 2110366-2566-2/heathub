import * as React from "react";
import { cn } from "@/utils/tailwind-merge";

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
          "bg-background text-body5 ring-offset-background flex h-10 w-full rounded-xl border border-primary-300 px-3 py-2 file:mr-4 file:rounded-xl file:border-0 file:bg-primary-500 file:text-sm file:font-medium file:text-invert placeholder:text-placeholder invalid:border-red-500 invalid:bg-red-100 invalid:text-red-500 hover:file:bg-primary-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary-100 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-disable disabled:opacity-90",
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
