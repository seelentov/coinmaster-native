import { api } from './api'

const BASE_URL = "/positions";

export const positionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPositions: builder.query<IResponse<IPosition[]>, IPositionFilter>({
            query: () => BASE_URL,
        }),
    })
})

export const { useGetPositionsQuery } = positionsApi
