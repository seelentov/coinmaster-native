interface IValuteIndexRequest extends IBaseRequest {
    name?: string[],
    code?: string[]
    orderBy?: string,
    orderDir?: string,
    date?: string,
}

type IValuteOrderBy = "rise_percent" | "rise" | "value"