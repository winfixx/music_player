import { LOGIN_ROUTE, REFRESH_ROUTE, REGISTRATION_ROUTE } from '../../constants/constants'
import { UserForm } from '../../page/authorization/Authorization'
import { User } from '../../types/User.type'
import { api } from './api'

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        registration: build.mutation<User, UserForm>({
            query: (user) => ({
                url: `/auth/${REGISTRATION_ROUTE}`,
                method: 'POST',
                body: {
                    ...user
                }
            })
        }),
        login: build.mutation<User, UserForm>({
            query: (user) => ({
                url: `/auth/${LOGIN_ROUTE}`,
                method: 'POST',
                body: {
                    ...user
                }
            })
        }),
        checkAuth: build.query<User, null>({
            query: () => ({
                url: `/auth/${REFRESH_ROUTE}`,
                method: 'GET',
            }),
            providesTags: ['User']
        })
    })
})
