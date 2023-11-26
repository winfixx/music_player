import { ALBUM_ROUTE } from '../../constants/constants'
import { Album } from '../../types/Album.type'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import { api } from './api'

interface AlbumArgs extends Partial<ChangeInfoHeading> {
    userId: number | null | undefined
    albumId: number | string | null | undefined
}

export const albumApi = api.injectEndpoints({
    endpoints: build => ({
        createAlbum: build.mutation<{ id: number }, AlbumArgs['userId']>({
            query: (userId) => ({
                url: `/${ALBUM_ROUTE}`,
                method: 'POST',
                body: {
                    userId
                }
            }),
            invalidatesTags: ['Album']
        }),
        addTrackInAlbum: build.mutation<unknown, Pick<AlbumArgs, 'albumId' | 'userId'>>({
            query: () => ({
                url: `/${ALBUM_ROUTE}/add-track`,
                method: 'POST',
                body: {

                }
            }),
            invalidatesTags: ['AlbumUpdate']
        }),
        addAlbumInLibrary: build.mutation<unknown, Pick<AlbumArgs, 'albumId' | 'userId'>>({
            query: ({ albumId, userId }) => ({
                url: `/${ALBUM_ROUTE}/add-library`,
                method: 'POST',
                body: {
                    albumId,
                    userId
                }
            }),
            invalidatesTags: ['Album', 'AlbumUpdate']
        }),
        deleteTrackFromAlbum: build.mutation<unknown, any>({
            query: () => ({
                url: `/${ALBUM_ROUTE}/delete-track`,
                method: 'DELETE'
            }),
            invalidatesTags: ['AlbumUpdate']
        }),
        deleteAlbumFromLibrary: build.mutation<unknown, Pick<AlbumArgs, 'albumId' | 'userId'>>({
            query: ({albumId, userId}) => ({
                url: `/${ALBUM_ROUTE}/delete-album?albumId=${albumId}&userId=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Album', 'AlbumUpdate']
        }),
        getOneAlbum: build.query<Album, Pick<AlbumArgs, 'albumId' | 'userId'>>({
            query: ({ albumId, userId }) => ({
                url: `/${ALBUM_ROUTE}/${albumId}?userId=${userId ? userId : 0}`,
                method: 'GET'
            }),
            providesTags: ['AlbumUpdate']
        }),
        getAlbumFromLibrary: build.query({
            query: () => ({
                url: `/${ALBUM_ROUTE}/library?ds=sd`,
                method: 'GET'
            }),
            providesTags: ['Album']
        }),
    })
})