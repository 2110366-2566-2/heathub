export const getTimeDiff = (date: string) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return getDuration(diffTime);
  }
  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }
  if (diffDays < 60) {
    return "1 month ago";
  }
  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} months ago`;
  }
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} years ago`;
};
export const getTimeStamp = (date: string) => {
  const date1 = new Date(date);
  return date1.getTime();
};

function getDuration(diffTime: number): string {
  const hours = Math.floor(diffTime / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  return `${seconds} seconds ago`;
}

export const getClockTime = (date: string) => {
  let date1 = new Date(date);
  const timestampInMilliseconds: number = date1.getTime();

  const dateObject: Date = new Date(timestampInMilliseconds);

  const hours: number = dateObject.getUTCHours();
  const minutes: number = dateObject.getUTCMinutes();

  const clockTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return clockTime;
};
