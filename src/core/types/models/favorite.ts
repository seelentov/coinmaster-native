interface IFavoriteBase {
    currency_id: number,
    is_active: boolean,
    active_exchanges_ids: number[],
}


interface IFavorite extends IFavoriteBase {
    id: number,
}

interface IFavoriteDetail extends IFavorite {
    exchanges: IFavoriteExchangeDetail[]
}

interface IFavoriteExchangeDetail {
    id: number,
    name: string,
    icon_url: string
}