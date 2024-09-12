import { api } from './api'

const BASE_URL = "/settings";

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query<ISettings, void>({
            query: () => BASE_URL + '/',
            providesTags: ['settings'],
        }),
        setSettings: builder.mutation<IMessageResponse, ISettingsStoreRequest>({
            query: (body) => ({
                url: BASE_URL + `/`,
                method: "POST",
                body
            }),
            invalidatesTags: ['settings'],
        }),
    }),
})

export const {
    useGetSettingsQuery,
    useSetSettingsMutation
} = settingsApi
