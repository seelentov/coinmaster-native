export function convertDateToString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript нумеруются с 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}