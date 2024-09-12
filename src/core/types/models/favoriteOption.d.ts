interface IFavoriteOption extends IBaseModel {
    value_count: number,
    favorite_id: number,
    name: string,
    time_count: number,
    time_type: IFavoriteOptionTimeType,
    value_type: IFavoriteOptionValueType,
    option_type: IFavoriteOptionOptionType,
}

enum IFavoriteOptionTimeType {
    TIME_TYPE_DAY = 'day',
    TIME_TYPE_MONTH = 'month',
    TIME_TYPE_YEAR = 'year'
}

enum IFavoriteOptionValueType {
    VALUE_TYPE_PERCENT = 'percent',
    VALUE_TYPE_VALUE = 'value'
}

enum IFavoriteOptionOptionType {
    OPTION_TYPE_FALL = 'fall',
    OPTION_TYPE_RAISE = 'raise',
    OPTION_TYPE_ALL = 'all'
}