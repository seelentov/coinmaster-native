interface ICurrency extends IValuteTypeInfo {
    sign: string,
}

interface ICurrencyAnnouncement extends ICurrency, IValuteNumInfo {
}

interface ICurrencyDetail extends ICurrency, IWithPositions<IValuteExchangeInfo> {

}