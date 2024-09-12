
export const localeStringDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};