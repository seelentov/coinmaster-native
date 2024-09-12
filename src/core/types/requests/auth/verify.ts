interface IAuthVerifyRequest extends IBaseRequest {
    phone: string,
    code: number,
}