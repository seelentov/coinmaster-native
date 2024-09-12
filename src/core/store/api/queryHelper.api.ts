import { api } from './api'

const BASE_URL = "/queryHelper";

export const queryHelper = api.injectEndpoints({
    endpoints: (builder) => ({
        queryHelp: builder.query<string[], string>({
            query: (search) => BASE_URL + "?search=" + search,
        }),
    }),
})

export const {
    useQueryHelpQuery
} = queryHelper
