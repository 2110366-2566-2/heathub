import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-h4 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100",
        outline:
          "border border-primary-500 text-primary-500 bg-background hover:bg-primary-100 disabled:border-primary-100 disabled:text-primary-100",
        secondaryOutline:
          "bg-neutral-0 text-secondary-500 hover:bg-secondary-50 hover:text-secondary-700 hover:border-secondary-700 disabled:bg-neutral-0 disabled:text-secondary-700 disabled:border-secondary-700 border border-secondary-500",
        secondary:
          "bg-secondary-400 text-white hover:bg-secondary-500 disabled:bg-secondary-200 disabled:text-secondary-400",
        ghost: "hover:bg-primary-100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary-600 underline-offset-2 hover:underline",
      },
      size: {
        md: "h-10 px-4 py-2 h5",
        sm: "h-8 px-4 py-2 h6 font-bold",
        lg: "h-12 px-4 py-2 h4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
