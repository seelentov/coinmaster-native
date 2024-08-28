import { api } from './api'

const BASE_URL = "/queryHelper";

export const queryHelperApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getQueryHelper: builder.query<IQueryHelperResponse, IQueryHelperRequest>({
            query: ({ filter, type }) => "/" + type + BASE_URL + objectToQueryString(filter as any),
        }),
    }),
})

export const { useGetQueryHelperQuery } = queryHelperApi
