import { api } from './api'

const BASE_URL = "/news";

export const newsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query<IPaginationResponse<INews[]>, INewsFilter>({
            query: (filter) => BASE_URL + "?" + objectToQueryString(filter as any),
        }),
        getSingleNews: builder.query<IResponse<INews>, number>({
            query: (id) => BASE_URL + "/" + id,
        }),
    }),
})

export const { useGetNewsQuery, useGetSingleNewsQuery } = newsApi
