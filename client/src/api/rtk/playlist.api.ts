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
            invalidatesTags: ['Library']
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
            invalidatesTags: ['Library', 'PlaylistUpdate', 'AlbumUpdate', 'Track']
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
            invalidatesTags: ['Library', 'PlaylistUpdate'],
        }),
        deleteTrackFromPlaylist: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ userId, playlistId, trackId }) => ({
                url: `/${PLAYLIST_ROUTE}/delete-track?userId=${userId}&playlistId=${playlistId}&trackId=${trackId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Library', 'PlaylistUpdate', 'AlbumUpdate', 'Track']
        }),
        deletePlaylistFromLibrary: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId }) => ({
                url: `/${PLAYLIST_ROUTE}/delete-playlist?playlistId=${playlistId}&userId=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Library', 'PlaylistUpdate']
        }),
        deletePlaylistFromAll: build.mutation<unknown, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId }) => ({
                url: `/${PLAYLIST_ROUTE}/delete-playlist-everywhere?playlistId=${playlistId}&userId=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Library']
        }),
        getOnePlaylist: build.query<Playlist, PickIdsPlaylistArgs>({
            query: ({ playlistId, userId }) => ({
                url: `/${PLAYLIST_ROUTE}/${playlistId}?userId=${userId ? userId : 0}`,
                method: 'GET'
            }),
            providesTags: ['PlaylistUpdate']
        })
    })
})