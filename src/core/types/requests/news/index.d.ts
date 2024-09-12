interface INewsIndexRequest extends IBaseRequest {
    search: string[],
    page_size?: number,
    page?: number,
}