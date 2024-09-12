type ISettingsLang = "ru"

interface ISettingsBase {
    notif_time: string,
    notif_active: boolean,
    lang: ISettingsLang
}

interface ISettings extends ISettingsBase, IBaseModel {
    user_id: number,
}
