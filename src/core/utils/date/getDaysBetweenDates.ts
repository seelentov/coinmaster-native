export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
    const msInDay = 1000 * 60 * 60 * 24;
    return Math.ceil((endDate.getTime() - startDate.getTime()) / msInDay);
};
