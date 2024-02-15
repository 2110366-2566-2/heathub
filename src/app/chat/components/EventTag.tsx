import { EventDetailCardProps } from "./type";
import { Tag } from "@/app/_components/tag";
import { cn } from "@/utils/tailwind-merge";

export default function EventTag({
  type,
}: {
  type: EventDetailCardProps["status"];
}) {
  let status = "Pending";
  let color = "";
  switch (type) {
    case "pending":
      color = "bg-pending";
      break;
    case "payment-done":
      status = "Confirmed";
      color = "bg-success";
      break;
    case "completed":
      status = "Completed";
      color = "bg-success";
      break;
    case "cancelled":
      status = "Cancelled";
      color = "bg-error-default";
      break;
    case "rejected":
      status = "Rejected";
      color = "bg-error-default";
      break;
    default:
      status = "Pending";
      color = "bg-pending";
      break;
  }
  return (
    <Tag key={status} variant="solid" size="md" className={cn("", color)}>
      {status}
    </Tag>
  );
}
