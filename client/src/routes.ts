import { lazy } from 'react'
import Home from './page/home/Home'
import Search from './page/search/Search'

const Authorization = lazy(() => import('./page/authorization/Authorization'))

export const routeIsAuth = [
    {
        path: '*',
        Element: Home,
    },
    {
        path: '/search',
        Element: Search
    },
]

export const route = [
    {
        path: '/login',
        Element: Authorization
    },
    {
        path: '/registration',
        Element: Authorization
    }
]


