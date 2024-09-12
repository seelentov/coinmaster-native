import { api } from './api'

const BASE_URL = "/favoriteOptions";

export const favoriteOptionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        storeFavoriteOption: builder.mutation<IMessageResponse, { id: number, body: IFavoriteOptionStoreRequest }>({
            query: ({ id, body }) => ({
                url: BASE_URL + `/` + id,
                method: "POST",
                body
            }),
            invalidatesTags: ['favorite'],
        }),
        removeFavoriteOption: builder.mutation<IMessageResponse, number>({
            query: (id) => ({
                url: BASE_URL + `/` + id,
                method: "DELETE",
            }),
            invalidatesTags: ['favorite'],
        }),
    }),
})

export const {
} = favoriteOptionsApi
