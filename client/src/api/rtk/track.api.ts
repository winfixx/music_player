import { TRACK_ROUTE } from '../../constants/constants'
import { Track } from '../../types/Track.type'
import { api } from './api'

interface TrackArgs {
    userId: number | null | undefined
    trackId?: number | string | null
}

export const trackApi = api.injectEndpoints({
    endpoints: build => ({
        getOneTrack: build.query<Track, TrackArgs>({
            query: ({ trackId, userId }) => ({
                url: `/${TRACK_ROUTE}/${trackId}?userId=${userId ? userId : 0}`,
                method: 'GET'
            }),
            providesTags: ['Track']
        }),
        deleteTrackFromAll: build.mutation<Track, TrackArgs>({
            query: ({ trackId, userId }) => ({
                url: `/${TRACK_ROUTE}/delete-track?trackId=${trackId}&userId=${userId ? userId : 0}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Track']
        }),
    })
})