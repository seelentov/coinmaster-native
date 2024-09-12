interface IValute extends IBaseModel {
    name: string,
    char_code: string,
    code: string,
}

interface IValuteData {
    value: number,
    prev_value: number,
    rise: number,
    rise_percent: number
}

interface IPosition extends IValuteData {
    date: string
}

type IValuteDetail = IValute & { positions: IPosition[] }
type IValutePreview = IValute & IValuteData