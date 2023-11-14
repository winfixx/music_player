import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCESS_TOKEN, SERVER_API } from '../constants/constants'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_API,
        credentials: 'include',
        prepareHeaders(headers, api) {
            const accessToken = localStorage.getItem(ACCESS_TOKEN)
            if (accessToken) {
                headers.set('Authorization', accessToken)
            }

            return headers
        }
    }),
    endpoints: build => ({})
})