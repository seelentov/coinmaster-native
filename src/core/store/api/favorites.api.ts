import { api } from './api'

const BASE_URL = "/favorites";

export const favoritesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFavorites: builder.query<IResponse<IFavorite[]>, IFavoritesFilter>({
            query: (filter) => BASE_URL + "?" + objectToQueryString(filter as any),
            providesTags: ['favorites']
        }),
        storeFavorite: builder.mutation<IResponse<void>, IStoreFavoriteRequest>({
            query: (body) => ({
                url: BASE_URL,
                method: "POST",
                body
            }),
            invalidatesTags: ['favorites'],
        }),
        deleteFavorite: builder.mutation<IResponse<void>, number>({
            query: (id) => ({
                url: BASE_URL + "/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ['favorites'],
        }),
    })
})

export const { useGetFavoritesQuery, useStoreFavoriteMutation, useDeleteFavoriteMutation } = favoritesApi
