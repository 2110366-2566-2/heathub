import { EventStatus } from "./_components/Card";
import { type ratingAndReview } from "./types";

export function parseTabValue(
  value: string,
): "upcoming" | "completed" | undefined {
  switch (value) {
    case "upcoming":
      return "upcoming";
    case "completed":
      return "completed";
    default:
      return "upcoming";
  }
}

export function parseEventStatus(
  dateTime: Date,
  status: string,
  review: ratingAndReview | null,
): EventStatus {
  let isStarted = false;
  const currentDateTime = new Date();
  if (currentDateTime > dateTime) {
    isStarted = true;
  }

  if (status == "payment-done" && isStarted) {
    return EventStatus.STARTED;
  } else if (status == "completed" && !review) {
    return EventStatus.WAITINGREVIEW;
  } else if (status == "completed") {
    return EventStatus.COMPLETED;
  } else if (
    status == "pending" ||
    status == "cancelled" ||
    status == "rejected"
  ) {
    return EventStatus.CANCELLED;
  } else {
    return EventStatus.NOTSTARTED;
  }
}
export function formatDate(dt: Date): string {
  const outputDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dt);

  const outputTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dt);

  const formattedDateTime = `${outputDate} at ${outputTime}`;

  return formattedDateTime;
}
