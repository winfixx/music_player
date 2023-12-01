import { LIBRARY_ROUTE } from '../../constants/constants'
import { Library } from '../../types/LibraryPlaylist.type'
import { PlaylistArgs } from '../../types/PlaylistArgs.type'
import { api } from './api'

export type TypeSearchingInLibrary = 'playlist' | 'album' | undefined
export type TypeSortingInLibrary = 'По алфавиту' | 'Недавно добавленные' | 'По автору' | undefined

export const libraryApi = api.injectEndpoints({
    endpoints: build => ({
        getLibrary: build.query<
            Library,
            { userId: PlaylistArgs['userId'], name?: string, type?: TypeSearchingInLibrary, sorting?: TypeSortingInLibrary }
        >({
            query: ({ userId = 0, name, type, sorting }) => ({
                url: `/${LIBRARY_ROUTE}?userId=${userId}&name=${name}&type=${type}&sorting=${sorting}`,
                method: 'GET'
            }),
            providesTags: ['Library']
        })
    })
})