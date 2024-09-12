interface IMessage extends IBaseModel {
    text: string,
    user_id: number,
    user: IUser,
    chat_id: number,
    created_at: string,
    updated_at: string,
}