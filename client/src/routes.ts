import { lazy } from 'react'
import Home from './page/home/Home'
import { ALBUM_ROUTE, LOGIN_ROUTE, PLAYLIST_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE, TRACK_ROUTE } from './constants/constants'
import Profile from './page/profile/Profile'
import TrackPage from './page/track/TrackPage'

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
    {
        path: `/${PROFILE_ROUTE}/:userId`,
        Element: Profile

    },
    {
        path: `/${TRACK_ROUTE}/:trackId`,
        Element: TrackPage
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