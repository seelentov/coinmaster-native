import { api } from './api'

const BASE_URL = "/favorite";

export const favoriteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFavorites: builder.query<IFavorite[], void>({
            query: () => BASE_URL + '/',
            providesTags: ['favorite'],
        }),
        storeFavorite: builder.mutation<IMessageResponse, IFavoriteStoreRequest>({
            query: (body) => ({
                url: BASE_URL + `/`,
                method: "POST",
                body
            }),
            invalidatesTags: ['favorite'],
        }),
        removeFavorite: builder.mutation<IMessageResponse, number>({
            query: (id) => ({
                url: BASE_URL + `/` + id,
                method: "DELETE",
            }),
            invalidatesTags: ['favorite'],
        }),
    }),
})

export const {
    useGetFavoritesQuery,
    useStoreFavoriteMutation,
    useRemoveFavoriteMutation
} = favoriteApi
