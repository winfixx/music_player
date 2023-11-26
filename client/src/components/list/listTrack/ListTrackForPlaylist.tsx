import * as React from 'react'
import { PickIdsPlaylistArgs } from '../../../types/PlaylistArgs.type'
import { Track } from '../../../types/Track.type'
import ItemTrack from './ItemTrack'
import ListTrack from './ListTrack'
import AlbumName from './partsItemTrack/AlbumName'
import AvatarTitleAuthor from './partsItemTrack/AvatarTitleAuthor'
import DateAddedTrack from './partsItemTrack/DateAddedTrack'
import IndexTrack from './partsItemTrack/IndexTrack'
import TimeTrack from './partsItemTrack/TImeTrack'

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
                    <AvatarTitleAuthor avatarTrack={track.avatar}
                        nameAuthorTrack={track.author.name}
                        nameTrack={track.name}
                    />
                    <AlbumName nameAlbumTrack={track.album?.name} />
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
