interface IResponseBase<T> {
    data?: T
}

interface IResponse<T> extends IResponseBase<T> {
    message?: string
    error?: string
    errors?: { [key: string]: string },
}

interface IPagination<T> extends IResponseBase<T> {
    meta: {
        current_page: number,
        from: number,
        last_page: number,
    },
    per_page: number,
    to: number,
    total: number,
}
type IPaginationResponse<T> = IPagination<T> | IResponse<T>