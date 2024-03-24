"use client";
import { cn } from "@/utils/tailwind-merge";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type NavItemProp = {
  link: string;
  icon: IconDefinition;
  isSelected: boolean;
  title?: string;
};

export function NavItem(prop: NavItemProp) {
  return (
    <Link
      href={prop.link}
      className={cn(
        "group relative flex w-full flex-row items-center justify-center gap-2 self-center rounded-lg p-2 text-invert hover:cursor-pointer hover:bg-secondary-300",
        prop.isSelected && "bg-secondary-500",
      )}
    >
      {prop.title ? (
        <FontAwesomeIcon icon={prop.icon} size={"sm"} />
      ) : (
        <FontAwesomeIcon icon={prop.icon} size={"2x"} />
      )}
      {prop.title && <h6 className="h6 flex-1 font-bold">{prop.title}</h6>}
    </Link>
  );
}
