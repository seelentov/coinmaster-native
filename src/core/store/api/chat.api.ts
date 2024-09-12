import { objectToQueryString } from '../../utils/api/objectToQueryString';
import { api } from './api'

const BASE_URL = "/chat";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChat: builder.query<IResponse<IChat>, { identificator: string, body: IChatShowRequest }>({
            query: ({ identificator, body }) => BASE_URL + '/' + identificator + '/?' + objectToQueryString(body),
            providesTags: ['chat']
        }),
        throwMessage: builder.mutation<IMessageResponse, { id: number, body: IChatStoreRequest }>({
            query: ({ id, body }) => ({
                url: BASE_URL + `/` + id,
                method: "POST",
                body
            }),
            invalidatesTags: ['chat'],
        }),
        removeMessage: builder.mutation<IMessageResponse, number>({
            query: (id) => ({
                url: BASE_URL + `/` + id,
                method: "DELETE",
            }),
            invalidatesTags: ['chat'],
        }),
    }),
})

export const {
    useGetChatQuery,
    useThrowMessageMutation,
    useRemoveMessageMutation
} = chatApi
