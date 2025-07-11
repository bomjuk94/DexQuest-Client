export const convertUTC = (iso: string) => {
    const date = new Date(iso);

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}
