interface IBaseResponse {

}

type IResponse<T> = IBaseResponse & (T & IMessageResponse)