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
          "text-body5 flex h-10 w-full rounded-xl bg-neutral-100 px-3 py-2 ring-offset-neutral-100 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-100 file:text-sm file:font-medium file:text-invert placeholder:text-placeholder invalid:border-red-500 invalid:bg-red-100 invalid:text-red-500 hover:file:bg-neutral-100 focus-visible:bg-white focus-visible:outline-none focus-visible:ring focus-visible:ring-primary-100 focus-visible:ring-offset-0 invalid:focus-visible:ring invalid:focus-visible:ring-red-200 invalid:focus-visible:ring-offset-0 disabled:bg-neutral-50 disabled:opacity-90",
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
