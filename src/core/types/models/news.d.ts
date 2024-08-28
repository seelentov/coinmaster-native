interface INewsBase {
    name: string
}

interface INews extends INewsBase {
    thumbnail_url: string,
    chat_id: number,
    created_at: string,
}

interface INewsDetail extends INews {
    text: string
}