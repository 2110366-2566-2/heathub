import { Tag } from "@/app/_components/tag";
import { EventStatus } from "./Card";

interface StatusProps {
  size: "sm" | "md" | "lg";
  status?: EventStatus;
}

export function StatusTag(props: StatusProps) {
  switch (props.status) {
    case EventStatus.WAITINGREVIEW:
      return (
        <Tag
          className="border-success text-success"
          variant="outline"
          size={props.size}
        >
          {EventStatus.WAITINGREVIEW}
        </Tag>
      );
    case EventStatus.COMPLETED:
      return (
        <Tag
          className="border-success text-success"
          variant="outline"
          size={props.size}
        >
          {EventStatus.COMPLETED}
        </Tag>
      );
    default:
      return (
        <Tag variant="outline" size={props.size}>
          {props.status}
        </Tag>
      );
  }
}
