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
      href={prop.link}
      className={cn(
        "group relative flex w-12 justify-center self-center rounded-lg p-2 text-invert hover:cursor-pointer hover:bg-secondary-300",
        prop.isSelected && "bg-secondary-500",
      )}
    >
      <FontAwesomeIcon icon={prop.icon} size={"2x"} />
    </Link>
  );
}
