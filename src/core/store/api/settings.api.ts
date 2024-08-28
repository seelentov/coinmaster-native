import { api } from './api'

const BASE_URL = "/settings";

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query<IResponse<ISettings>, void>({
            query: () => BASE_URL,
            providesTags: ['settings'],
        }),
        updateSettings: builder.mutation<IResponse<void>, IUpdateSettingsRequest>({
            query: (body) => ({
                url: BASE_URL,
                method: "POST",
                body
            }),
            invalidatesTags: ['settings'],
        }),

    }),
})

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi
