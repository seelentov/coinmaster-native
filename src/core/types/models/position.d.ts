interface IPositionBase {
    price: number,
    datetime: string,
}

interface IPositionRelations {
    currency_id: number,
    exchange_id: number,
}

interface IPosition extends IPositionBase, IPositionRelations {
    id: number
}
