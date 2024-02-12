import * as React from "react";
import { cn } from "@/utils/tailwind-merge";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "bg-background flex min-h-[80px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm placeholder:text-placeholder focus-visible:outline-none focus-visible:ring focus-visible:ring-primary-100 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-disable disabled:opacity-90",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
