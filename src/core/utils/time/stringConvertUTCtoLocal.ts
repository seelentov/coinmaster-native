export default function stringConvertUTCtoLocal(time: string): string {
    // Разбиваем входящую строку на часы, минуты и секунды
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Создаем объект Date с текущей датой и временем
    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));

    // Получаем локальные часы, минуты и секунды
    const localHours = utcDate.getHours();
    const localMinutes = utcDate.getMinutes();
    const localSeconds = utcDate.getSeconds();

    // Форматируем локальные часы, минуты и секунды в строку "HH:MM:SS"
    return `${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}:${String(localSeconds).padStart(2, '0')}`;
}