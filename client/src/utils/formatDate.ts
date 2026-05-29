export const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    });
};
