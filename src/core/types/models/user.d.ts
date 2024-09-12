interface IUser extends IBaseModel {
    name: string,
    avatar_url: string,
    email?: string,
    phone?: string,
    expo_token?: string,
    sub_date?: string,
}