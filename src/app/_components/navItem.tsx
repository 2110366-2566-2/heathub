"use client";
import { cn } from "@/utils/tailwind-merge";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type NavItemProp = {
  link: string;
  icon: IconDefinition;
  isSelected: boolean;
};

export function NavItem(prop: NavItemProp) {
  return (
    <Link
      className="group relative items-center self-center hover:cursor-pointer"
      href={prop.link}
    >
      <FontAwesomeIcon
        icon={prop.icon}
        className={cn(
          "h-7 w-7 rounded-lg p-2 text-invert hover:bg-secondary-300",
          prop.isSelected && "bg-secondary-500",
        )}
      />
    </Link>
  );
}
