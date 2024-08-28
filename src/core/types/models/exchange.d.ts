interface IExchange extends IValuteTypeInfo {

}

interface IExchangeAnnouncement extends IExchange {
}

interface ICurrencyDetail extends IExchange, IWithPositions<IValuteCurrencyInfo> {

}