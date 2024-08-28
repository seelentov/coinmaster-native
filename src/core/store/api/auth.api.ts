import { api } from './api'

const BASE_URL = "/auth";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<void, IUser>({
            query: () => BASE_URL + '/me',
            providesTags: ['auth'],
        }),
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (body) => ({
                url: BASE_URL + `/login/`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        updateAvatar: builder.mutation<IResponse<void>, IUpdateAvatarRequest>({
            query: (body) => ({
                url: BASE_URL + `/updateAvatar`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        verify: builder.mutation<ILoginResponse, IVerifyRequest>({
            query: (body) => ({
                url: BASE_URL + `/verify`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        register: builder.mutation<IResponse<void>, IRegisterRequest>({
            query: (body) => ({
                url: BASE_URL + `/register`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        updateExpo: builder.mutation<IResponse<void>, string>({
            query: (expo_token) => ({
                url: BASE_URL + `/updateExpo`,
                method: "POST",
                body: { expo_token }
            }),
            invalidatesTags: ['auth'],
        }),
        logout: builder.mutation<IResponse<void>, void>({
            query: (body) => ({
                url: BASE_URL + `/logout`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
        }),
        refresh: builder.mutation<ILoginResponse, void>({
            query: (body) => ({
                url: BASE_URL + `/logout`,
                method: "POST",
                body
            }),
            invalidatesTags: ['auth'],
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
