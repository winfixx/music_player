import { UserForm } from '../page/authorization/Authorization'
import { User } from '../types/User'
import { api } from './api'

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        registration: build.mutation<User, UserForm>({
            query: (user) => ({
                url: '/auth/registration',
                method: 'POST',
                body: {
                    ...user
                }
            })
        }),
        login: build.mutation<User, UserForm>({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    ...user
                }
            })
        }),
        checkAuth: build.query<User, null>({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        })
    })
})
