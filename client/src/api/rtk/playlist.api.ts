import { PLAYLIST_ROUTE } from '../../constants/constants'
import { Playlist } from '../../types/Playlist.type'
import { PickIdsPlaylistArgs, PlaylistArgs } from '../../types/PlaylistArgs.type'
import { api } from './api'

export const playlistApi = api.injectEndpoints({
    endpoints: (build) => ({
        createPlaylist: build.mutation<{ id: number }, PlaylistArgs['userId']>({
            query: (userId) => ({
                url: `/${PLAYLIST_ROUTE}`,
                method: 'POST',
                body: {
                    userId
                }
            }),
            invalidatesTags: ['Playlist']
        }),
        updateInfo: build.mutation<unknown, FormData>({
            query: (form) => ({
                url: `/${PLAYLIST_ROUTE}/update-info`,
                body: {
                    form
                },
                method: 'POST'
            }),
            invalidatesTags: ['PlaylistUpdate', 'Playlist']
        }),
        addTrackInPlaylist: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId, trackId }) => ({
                url: `/${PLAYLIST_ROUTE}/add-track`,
                method: 'POST',
                body: {
                    playlistId,
                    userId,
                    trackId
                },
            }),
            invalidatesTags: ['Playlist', 'PlaylistUpdate', 'AlbumUpdate']
        }),
        addPlaylistInLibrary: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId }) => ({
                url: `/${PLAYLIST_ROUTE}/add-library`,
                method: 'POST',
                body: {
                    playlistId,
                    userId
                },
            }),
            invalidatesTags: ['Playlist', 'PlaylistUpdate'],
        }),
        deleteTrackFromPlaylist: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ userId, playlistId, trackId }) => ({
                url: `/${PLAYLIST_ROUTE}/delete-track?userId=${userId}&playlistId=${playlistId}&trackId=${trackId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Playlist', 'PlaylistUpdate', 'AlbumUpdate']
        }),
        deletePlaylistFromLibrary: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId }) => ({
                url: `/${PLAYLIST_ROUTE}/delete-playlist?playlistId=${playlistId}&userId=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Playlist', 'PlaylistUpdate']
        }),
        getOnePlaylist: build.query<Playlist, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId }) => ({
                url: `/${PLAYLIST_ROUTE}/${playlistId}?userId=${userId ? userId : 0}`,
                method: 'GET'
            }),
            providesTags: ['PlaylistUpdate']
        }),
        getPlaylistsFromLibrary: build.query<any, {userId: number}>({
            query: ({userId, }) => ({
                url: `/${PLAYLIST_ROUTE}/library?ds=sd`,
                method: 'GET'
            }),
            providesTags: ['Playlist']
        }),
    })
})