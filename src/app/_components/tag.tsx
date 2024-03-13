"use client";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";

const tagVariants = cva(
  "inline-flex items-center rounded-full justify-center text-body6 text-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors disabled:pointer-events-none data-[state=on]:bg-primary-700 data-[state=on]:text-invert",
  {
    variants: {
      variant: {
        default:
          "bg-primary-50 text-primary-500 data-[state=on]:bg-primary-100 data-[state=on]:border data-[state=on]:border-primary-500 data-[state=on]:text-primary-500 ",
        outline:
          "border border-primary-500 text-primary-500 bg-transparent data-[state=on]:bg-primary-400 data-[state=on]:text-invert",
        solid: "bg-primary-500",
        ghost: "bg-white bg-opacity-50 text-white",
      },
      size: {
        md: "h6 h-7 px-3 py-1",
        sm: "small h-5 px-3 py-1",
        lg: "h6 h-10 px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type TagProps = {
  className?: string;
  variant?: "default" | "outline" | "solid" | "ghost";
  size?: "md" | "sm" | "lg";
  icon?: IconDefinition;
  color?:
    | "bg-tag-red"
    | "bg-tag-yellow"
    | "bg-tag-green"
    | "bg-tag-blue"
    | "bg-tag-pink";
  children: React.ReactNode;
};

function Tag({
  className,
  variant,
  size,
  icon,
  children,
  color,
  ...props
}: TagProps) {
  return (
    <div
      className={cn(tagVariants({ variant, size, className }), color)}
      {...props}
    >
      {icon ? <FontAwesomeIcon icon={icon} className="mr-2" size="sm" /> : ""}
      {children}
    </div>
  );
}

export { Tag, tagVariants };
