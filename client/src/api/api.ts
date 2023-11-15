import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCESS_TOKEN, SERVER_API } from '../constants/constants'
import { userActions } from '../redux/reducers/userSlice'
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_API,
    prepareHeaders: (headers, api) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if (accessToken) {
            headers.set('Authorization', accessToken)
        }

        return headers
    },
    credentials: 'include'
})

export interface ErrorReponse {
    status: number
    data: {
        message: string
    }
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, ErrorReponse | FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult.data) {
            localStorage.setItem(ACCESS_TOKEN, String(refreshResult.data.token.accessToken))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(userActions.setUser({}))
            localStorage.removeItem(ACCESS_TOKEN)
        }
    }
    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({})
})