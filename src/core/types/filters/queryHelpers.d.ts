interface IQueryHelperRequest {
    filter: IQueryStringObject,
    type: "news" | "exchanges" | "currecies"
}

type IQueryStringObject = Record<string, string | boolean | number | Array<string | number>>