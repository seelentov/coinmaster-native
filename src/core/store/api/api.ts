import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const STORAGE_URL = '/uploaded'

export const API_URL = BASE_URL + '/api'

const tagTypes = [
  "auth",
  "settings",
  "chat",
  "favorite",
  "notifications"
]

export const api = createApi({
  reducerPath: 'api',
  tagTypes: tagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as any).auth.token || await AsyncStorage.getItem("token")
      headers.set('Authorization', "Bearer " + token);
      headers.set('Content-Type', "application/json")
      headers.set('Accept', "application/json")
      return headers
    }
  }),
  endpoints: builder => ({
    base: builder.query<null, void>({
      query: () => '/',
    }),
  }),
})
export const { useBaseQuery } = api
