import * as React from 'react'
import { PickIdsPlaylistArgs } from '../../../types/PlaylistArgs.type'
import { Track } from '../../../types/Track.type'
import ListTrack from './ListTrack'

interface ListTrackForPlaylist extends PickIdsPlaylistArgs {
    tracks: Track[] | undefined
    authorId: number | null
    children: React.ReactNode
    addInLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteTrackFromLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const ListTrackForPlaylist: React.FunctionComponent<ListTrackForPlaylist> = React.memo(({
    children,
}) => {
    return (
        <ListTrack>
            {children}
        </ListTrack>
    )
})

export default ListTrackForPlaylist
