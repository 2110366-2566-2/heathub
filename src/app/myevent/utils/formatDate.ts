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
