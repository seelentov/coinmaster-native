interface ILoginRequest {
    phone: string,
    password: string,
}

interface IVerifyRequest extends ILoginRequest {
    code: string
}

interface IRegisterRequest extends ILoginRequest, IUserBase {
}

interface IUpdateAvatarRequest {
    avatar: File,
}

interface IUpdateExpoRequest {
    expo_token: string
}

interface IUpdateSettingsRequest extends ISettings {

}