import { api } from './api'

const BASE_URL = "/chat";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChat: builder.query<IPaginationResponse<ICommentBase[]>, { id: number, filter: IChatFilter }>({
            query: ({ id, filter }) => BASE_URL + "/" + id + "?" + objectToQueryString(filter as any),
            providesTags: ['chat']
        }),
        postMessage: builder.mutation<IResponse<void>, IStoreChatRequest>({
            query: (body) => ({
                url: BASE_URL,
                method: "POST",
                body
            }),
            invalidatesTags: ['chat'],
        }),
        deleteMessage: builder.mutation<IResponse<void>, number>({
            query: (id) => ({
                url: BASE_URL + "/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ['chat'],
        }),
    })
})

export const { useGetChatQuery, usePostMessageMutation, useDeleteMessageMutation } = chatApi
