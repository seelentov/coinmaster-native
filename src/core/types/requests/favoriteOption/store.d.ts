interface IFavoriteOptionStoreRequest extends IBaseRequest {
    name: string,
    time_count: number,
    time_type: IFavoriteOptionTimeType,
    value_type: IFavoriteOptionValueType,
    option_type: IFavoriteOptionOptionType,
}