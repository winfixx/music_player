import * as React from 'react'
import { PickIdsPlaylistArgs } from '../../../types/PlaylistArgs.type'
import { Track } from '../../../types/Track.type'
import AvatarTitle from '../../avatarTitle/AvatarTitle'
import ItemTrack from './ItemTrack'
import ListTrack from './ListTrack'
import AlbumName from './partsItemTrack/AlbumName'
import DateAddedTrack from './partsItemTrack/DateAddedTrack'
import IndexTrack from './partsItemTrack/IndexTrack'
import TimeTrack from './partsItemTrack/TImeTrack'
import { TRACK_ROUTE } from '../../../constants/constants'

interface ListTrackForPlaylist extends PickIdsPlaylistArgs {
    tracks: Track[] | undefined
    addInLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteFromLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const ListTrackForPlaylist: React.FunctionComponent<ListTrackForPlaylist> = React.memo(({
    tracks,
    userId,
    addInLibrary,
    deleteFromLibrary
}) => {
    return (
        <ListTrack>
            {tracks?.map((track, index) =>
                <ItemTrack key={track.id}
                    style={{ animationDelay: `.${index}s`, }}
                >
                    <IndexTrack index={index} />
                    <AvatarTitle avatar={track.avatar}
                        nameAuthor={track.author?.name}
                        name={track.name}
                        idAuthor={track.author?.id}
                        pathToTitle={`/${TRACK_ROUTE}/${track.id}`}
                    />
                    <AlbumName nameAlbumTrack={track.album?.name}
                        idAlbum={track?.album?.id}
                    />
                    <DateAddedTrack dateAddedTrackInPlaylist={track.PlaylistTrack?.createdAt} />
                    <TimeTrack time={'time'}
                        userId={userId}
                        author={false}
                        trackId={track.id}
                        haveInPlaylist={track?.playlists ? !!track?.playlists[0]?.name : false}
                        addInPlaylist={addInLibrary}
                        deleteFromPlaylist={deleteFromLibrary}
                    />
                </ItemTrack>
            )}
        </ListTrack>
    )
})

export default ListTrackForPlaylist
