"use client";
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";

const toggleVariants = cva(
  "inline-flex items-center rounded-full justify-center text-body6 text-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors hover:bg-primary-600 hover:text-invert disabled:pointer-events-none data-[state=on]:bg-primary-700 data-[state=on]:text-invert",
  {
    variants: {
      variant: {
        default:
          "bg-primary-50 text-primary-500 data-[state=on]:bg-primary-100 data-[state=on]:border data-[state=on]:border-primary-500 data-[state=on]:text-primary-500 hover:bg-primary-200 hover:text-invert",
        outline:
          "border border-primary-500 text-primary-500 bg-transparent hover:bg-secondary-300 hover:text-invert data-[state=on]:bg-toggle data-[state=on]:text-invert hover:border-toggle data-[state=on]:border-toggle",
        solid: "bg-primary-500",
        ghost:
          "bg-white bg-opacity-50 text-white hover:bg-primary-300 hover:text-invert",
      },
      size: {
        md: "h-7 px-3 py-1",
        sm: "h-5 px-3 py-1",
        lg: "h-10 px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> & { icon?: IconDefinition }
>(({ className, variant, size, icon, children, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    {icon && <FontAwesomeIcon icon={icon} className="mr-2 h-3 w-3" />}
    {children}
  </TogglePrimitive.Root>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
