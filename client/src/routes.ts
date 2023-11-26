import { lazy } from 'react'
import Home from './page/home/Home'
import { ALBUM_ROUTE, LOGIN_ROUTE, PLAYLIST_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from './constants/constants'

const Authorization = lazy(() => import('./page/authorization/Authorization'))
const Search = lazy(() => import('./page/search/Search'))
const Playlist = lazy(() => import('./page/playlist/Playlist'))
const Album = lazy(() => import('./page/album/Album'))

export const routeIsAuth = [
    {
        path: '*',
        Element: Home,
    },
    {
        path: `${SEARCH_ROUTE}`,
        Element: Search
    },
    {
        path: `/${PLAYLIST_ROUTE}/:playlistId`,
        Element: Playlist
    },
    {
        path: `/${ALBUM_ROUTE}/:albumId`,
        Element: Album

    },
]

export const route = [
    {
        path: `/${LOGIN_ROUTE}`,
        Element: Authorization
    },
    {
        path: `/${REGISTRATION_ROUTE}`,
        Element: Authorization
    }
]