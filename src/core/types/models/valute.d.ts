interface IValueBase {
    name: string
}

interface IValuteNumInfo {
    last_position: IPositionBase
    rise: number,
    risePercent: number
}

interface IValuteDescInfo {
    id: number,
    name: string,
    icon_url: string,
}

interface IValuteTypeInfo extends IValuteDescInfo, IValueBase {

}

interface IValuteInfo extends IValuteDescInfo, IValuteNumInfo { }
interface IValuteExchangeInfo extends IValuteInfo { }
interface IValuteCurrencyInfo extends IValuteInfo {
    sign: string
}


interface IWithPositions<T extends IValuteInfo> {
    positions: T[]
}