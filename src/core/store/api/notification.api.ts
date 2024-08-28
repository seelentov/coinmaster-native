import { api } from './api'

const BASE_URL = "/notifications";

export const notificationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<IPaginationResponse<INotification[]>, void>({
            query: () => BASE_URL,
            providesTags: ["notifications"]
        }),
        checkNotifications: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: BASE_URL + "/check",
                method: "POST",
            }),
            invalidatesTags: ['notifications'],
        }),
    })
})

export const { useGetNotificationsQuery, useCheckNotificationsMutation } = notificationApi
