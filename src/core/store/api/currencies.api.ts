import { api } from './api'

const BASE_URL = "/currencies";

export const currenciesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrencies: builder.query<IPaginationResponse<ICurrency[]>, ICurrencyFilter>({
            query: (filter) => BASE_URL + "?" + objectToQueryString(filter as any),
        }),
        getCurrenciesBest: builder.query<IPaginationResponse<ICurrency[]>, void>({
            query: () => BASE_URL + "/best",
        }),
        getCurrenciesWorst: builder.query<IPaginationResponse<ICurrency[]>, void>({
            query: () => BASE_URL + "/worst",
        }),
        getCurrency: builder.query<IResponse<ICurrency>, number>({
            query: (id) => BASE_URL + "/" + id,
        }),
    }),
})

export const { useGetCurrenciesBestQuery, useGetCurrenciesQuery, useGetCurrenciesWorstQuery, useGetCurrencyQuery } = currenciesApi
