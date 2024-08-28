interface ILoginResponseData {
    access_token: string,
    token_type: string,
    expires_in: number
}

interface ILoginResponse extends IResponse<ILoginResponseData> {

}

interface IMeResponse extends IResponse<IUser> {

}

interface ISettingsResponse extends IResponse<ISettings> {

}