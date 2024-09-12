import { api } from './api'

const BASE_URL = "/notification";

export const notificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<INotification[], void>({
            query: () => BASE_URL,
            providesTags: ['notifications'],

        }),
        checkUpdates: builder.mutation<IMessageResponse, void>({
            query: () => ({
                url: BASE_URL + `/checkUpdates`,
                method: "PATCH",
            }),
            invalidatesTags: ['notifications'],
        }),
    }),
})

export const {
    useGetNotificationsQuery,
    useCheckUpdatesMutation
} = notificationsApi
