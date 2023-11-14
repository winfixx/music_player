import { lazy, Suspense } from 'react'
import Home from './page/home/Home'
import Layout from './components/layout/Layout'
import { createBrowserRouter } from 'react-router-dom'

const Authorization = lazy(() => import('./page/authorization/Authorization'))
const Search = lazy(() => import('./page/search/Search'))

export const router = createBrowserRouter([
    {
        path: '*',
        element: <Layout><Home /></Layout>,
    },
    {
        path: '/search',
        element: <Layout>
            <Suspense>
                <Search />
            </Suspense>
        </Layout>
    },
    {
        path: '/login',
        element: <Suspense><Authorization /></Suspense>
    },
    {
        path: '/registration',
        element: <Suspense><Authorization /></Suspense>
    }
])

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


