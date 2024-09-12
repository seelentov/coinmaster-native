interface IFavorite extends IBaseModel {
    identifier: string,
    user_id: number,
    favorite_options: IFavoriteOption[],
    valute: IValute
}