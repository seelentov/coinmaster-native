import { objectToQueryString } from '../../utils/api/objectToQueryString';
import { api } from './api'

const BASE_URL = "/news";

export const newsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query<IDataResponse<INews[]>, INewsIndexRequest>({
            query: (query) => BASE_URL + '/?' + objectToQueryString(query),
        }),
    }),
})

export const {
    useGetNewsQuery,
} = newsApi
