import { objectToQueryString } from '../../utils/api/objectToQueryString';
import { api } from './api'

const BASE_URL = "/valute";

export const valuteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getValutes: builder.query<IDataResponse<IValutePreview[]>, IValuteIndexRequest>({
            query: (query) => BASE_URL + '/?' + objectToQueryString(query),
        }),
        getValute: builder.query<IDataResponse<IValuteDetail>, { id: string, body: IValuteShowRequest }>({
            query: ({ id, body }) => BASE_URL + "/" + id + '/?' + objectToQueryString(body),
        }),
    }),
})

export const {
    useGetValuteQuery,
    useGetValutesQuery
} = valuteApi
