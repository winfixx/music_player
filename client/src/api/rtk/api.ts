import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCESS_TOKEN, REFRESH_ROUTE, SERVER_API } from '../../constants/constants'
import { userActions } from '../../redux/reducers/userSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_API,
    headers: { 'content-type': 'application/json' },
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }

        return headers
    },
    credentials: 'include'
})

export interface ErrorResponse {
    status: number
    data: {
        message: string
    }
}

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result: any = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const refreshResult: MaybePromise<QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta>> = await baseQuery(`/auth/${REFRESH_ROUTE}`, api, extraOptions)

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
    baseQuery: baseQueryWithReAuth,
    endpoints: (build) => ({
        query: build.query({
            query: () => ({
                url: ''
            })
        })
    }),
    tagTypes: ['User', 'PlaylistUpdate', 'AlbumUpdate', 'Library', 'Track']
})