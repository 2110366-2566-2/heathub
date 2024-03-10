export function formatDate(dt: Date): string {
    // Define the output date format
    const outputFormat: string = "DD MMM YYYY [at] HH:mm";

    // Define the desired output date and time
    const outputDate = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(dt);
    const outputTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(dt);

    const formattedDateTime: string = `${outputDate} at ${outputTime}`;

    return formattedDateTime;
}