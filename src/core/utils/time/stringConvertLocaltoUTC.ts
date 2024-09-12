export default function stringConvertLocaltoUTC(time: string): string {
    // Разбиваем входящую строку на часы, минуты и секунды
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Создаем объект Date с текущей датой и временем, используя значения из time
    const localDate = new Date();
    localDate.setHours(hours, minutes, seconds);

    // Получаем временную зону UTC
    const utcHours = localDate.getUTCHours();
    const utcMinutes = localDate.getUTCMinutes();
    const utcSeconds = localDate.getUTCSeconds();

    // Форматируем часы, минуты и секунды в строку "HH:MM:SS"
    return `${String(utcHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}`;
}