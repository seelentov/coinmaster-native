import { api } from './api'

const BASE_URL = "/auth";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<IUser, void>({
            query: () => BASE_URL + '/me',
            providesTags: ['auth'],
        }),
        login: builder.mutation<IWithTokenResponse, IAuthLoginRequest>({
            query: (body) => ({
                url: BASE_URL + `/login/`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        updateAvatar: builder.mutation<IMessageResponse, File>({
            query: (file) => ({
                url: BASE_URL + `/updateAvatar`,
                method: "PATCH",
                body: { avatar: file }
            }),
            invalidatesTags: ['auth'],
        }),
        verify: builder.mutation<IWithTokenResponse, IAuthVerifyRequest>({
            query: (body) => ({
                url: BASE_URL + `/verify`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        register: builder.mutation<IMessageResponse, IAuthStoreRequest>({
            query: (body) => ({
                url: BASE_URL + `/register`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        updateExpo: builder.mutation<IMessageResponse, string>({
            query: (expo_token) => ({
                url: BASE_URL + `/updateExpo`,
                method: "PATCH",
                body: { expo_token }
            }),
            invalidatesTags: ['auth'],
        }),
        logout: builder.mutation<IMessageResponse, void>({
            query: (body) => ({
                url: BASE_URL + `/logout`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        refresh: builder.mutation<IWithTokenResponse, void>({
            query: (body) => ({
                url: BASE_URL + `/refresh`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const {
    useGetMeQuery,
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
    useUpdateExpoMutation,
    useUpdateAvatarMutation,
    useVerifyMutation,
    useRegisterMutation
} = authApi
