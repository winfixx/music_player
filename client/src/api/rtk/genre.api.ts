import { Genre } from '../../types/Genre.type'
import { api } from './api'

export const genreApi = api.injectEndpoints({
    endpoints: build => ({
        getGenre: build.query<Genre[], unknown>({
            query: () => ({
                url: '/genre',
                method: 'GET'
            })
        }),
        setPreferencesGenre: build.mutation<unknown, { genres: Genre[], userId: number | null }>({
            query: ({ genres, userId }) => ({
                url: '/genre',
                method: 'POST',
                body: {
                    genres,
                    userId
                }
            }),
            invalidatesTags: ['User']
        })
    })
})