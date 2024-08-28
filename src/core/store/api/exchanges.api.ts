import { api } from './api'

const BASE_URL = "/exchanges";

export const exchangesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getExchanges: builder.query<IPaginationResponse<IExchange[]>, IExchangeFilter>({
            query: (filter) => BASE_URL + "?" + objectToQueryString(filter as any),
        }),
        getExchange: builder.query<IResponse<IExchange>, number>({
            query: (id) => BASE_URL + "/" + id,
        }),
    }),
})

export const { useGetExchangeQuery, useGetExchangesQuery } = exchangesApi
