import { Playlist } from '../types/Playlist'
import { api } from './api'

export const playlistApi = api.injectEndpoints({
    endpoints: (build) => ({
        createPlaylist: build.mutation<Playlist, { userId: number | null }>({
            query: ({ userId }) => ({
                url: '/playlist',
                method: 'POST',
                body: {
                    userId
                }
            }),
            invalidatesTags: ['Playlist']
        }),
        getOnePlaylist: build.query<Playlist, string | undefined>({
            query: (playlistId) => ({
                url: `/playlist/${playlistId}`,
                method: 'GET'
            })
        }),
        getLibraryPlaylist: build.query({
            query: () => ({
                url: '/playlist/library?ds=sd',
                method: 'GET'
            }),
            providesTags: ['Playlist']
        }),
        setLibraryPlaylist: build.mutation({
            query: (playlistId) => ({
                url: '/playlist/set-library',
                method: 'POST',
                body: {
                    playlistId
                },
                invalidatesTags: ['Playlist']
            })
        }),
    })
})