"use client";
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faMusic,
  faFilm,
  faBook,
  faShirt,
  faPaw,
  faDumbbell,
  faCamera,
  faGamepad,
  faMugHot,
  faPalette,
  faTents,
  faBasketball,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";


const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-body6 text-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors hover:bg-primary-600 hover:text-invert disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary-700 data-[state=on]:text-invert",
  {
    variants: {
      variant: {
        default:
          "bg-primary-50 text-primary-500 data-[state=on]:bg-primary-100 data-[state=on]:border data-[state=on]:border-primary-500 data-[state=on]:text-primary-500 hover:bg-primary-200 hover:text-invert",
        outline:
          "border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-300 hover:text-invert data-[state=on]:bg-primary-400 data-[state=on]:text-invert",
        solid: "bg-primary-500",
      },
      size: {
        md: "h-7 px-3",
        sm: "h-5 px-2.5",
        lg: "h-10 px-5",
      },
      icon: {

      }
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
    VariantProps<typeof toggleVariants>& { icons?: IconDefinition;}
>(({ className, variant, size, icons, children, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    {icons && (
      <FontAwesomeIcon icon={icons} className="mr-2 h-4 w-4 text-primary-50" />
    )}
    {children}
  </TogglePrimitive.Root>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
