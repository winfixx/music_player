import * as React from 'react'
import { GRID_TEMPLATE_FOR_ALBUM, TRACK_ROUTE } from '../../../constants/constants'
import { PickIdsPlaylistArgs } from '../../../types/PlaylistArgs.type'
import { Track } from '../../../types/Track.type'
import AvatarTitle from '../../avatarTitle/AvatarTitle'
import ItemTrack from './ItemTrack'
import ListTrack from './ListTrack'
import IndexTrack from './partsItemTrack/IndexTrack'
import TimeTrack from './partsItemTrack/TImeTrack'

interface ListTrackForAlbum extends PickIdsPlaylistArgs {
    tracks: Track[] | undefined
    addInPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteFromPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const ListTrackForAlbum: React.FunctionComponent<ListTrackForAlbum> = React.memo(({
    tracks,
    userId,
    playlistId,
    addInPlaylist,
    deleteFromPlaylist
}) => {
    return (
        <ListTrack>
            {tracks?.map((track, index) =>
                <ItemTrack key={track.id}
                    style={{
                        gridTemplateColumns: GRID_TEMPLATE_FOR_ALBUM,
                        animationDelay: `.${index}s`,
                    }}
                >
                    <IndexTrack index={index} />
                    <AvatarTitle avatar={track.avatar}
                        nameAuthor={track.author.name}
                        name={track.name}
                        idAuthor={track.author.id}
                        pathToTitle={`/${TRACK_ROUTE}/${track.id}`}
                    />
                    <TimeTrack time={'time'}
                        userId={userId}
                        author={false}
                        haveInPlaylist={track?.playlists ? !!track.playlists[0]?.name : false}
                        trackId={track.id}
                        playlistId={playlistId}
                        addInPlaylist={addInPlaylist}
                        deleteFromPlaylist={deleteFromPlaylist}
                    />
                </ItemTrack>
            )}
        </ListTrack>
    )
})

export default ListTrackForAlbum
