interface IUserBase {
    email: string,
    name: string,
    expo_token: string,
}

interface IUserAnnoncement {
    avatar_url: string,
    name: string,
}

interface IUser extends IUserBase {
    id: 1,
    avatar_url: string,
    phone: string,
    settings_id: 1,
    sub_date: string,
}

interface ISettings {
    is_notify: boolean,
    notify_time: string
}