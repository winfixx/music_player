import { AUTH_ROUTE, LOGIN_ROUTE, REFRESH_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from '../../constants/constants'
import { UserForm } from '../../page/authorization/Authorization'
import { Profile } from '../../types/Profile'
import { User } from '../../types/User.type'
import { api } from './api'

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        registration: build.mutation<User, UserForm>({
            query: (user) => ({
                url: `/${AUTH_ROUTE}/${REGISTRATION_ROUTE}`,
                method: 'POST',
                body: {
                    ...user
                }
            })
        }),
        login: build.mutation<User, UserForm>({
            query: (user) => ({
                url: `/${AUTH_ROUTE}/${LOGIN_ROUTE}`,
                method: 'POST',
                body: {
                    ...user
                }
            })
        }),
        updateInfo: build.mutation({
            query: () => ({
                url: '',
                method: 'POST',
            }),
            invalidatesTags: ['User']
        }),
        checkAuth: build.query<User, null>({
            query: () => ({
                url: `/${AUTH_ROUTE}/${REFRESH_ROUTE}`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        getOneProfile: build.query<Profile, { userId: string | undefined }>({
            query: ({ userId }) => ({
                url: `/${USER_ROUTE}/${userId}`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        deleteAccount: build.mutation({
            query: ({ userIdSender }) => ({
                url: `delete-account?userIdSender=${userIdSender}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        })
    })
})
