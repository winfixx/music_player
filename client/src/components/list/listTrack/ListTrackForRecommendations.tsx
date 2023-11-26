import * as React from 'react'
import { GRID_TEMPLATE_FOR_RECOMMENDATIONS } from '../../../constants/constants'
import { Track } from '../../../types/Track.type'
import ButtonShared from '../../button/button-shared/ButtonShared'
import ItemTrack from './ItemTrack'
import ListTrack from './ListTrack'
import AlbumName from './partsItemTrack/AlbumName'
import AvatarTitleAuthor from './partsItemTrack/AvatarTitleAuthor'
import { PickIdsPlaylistArgs } from '../../../types/PlaylistArgs.type'

interface ListTrackForRecommendations extends PickIdsPlaylistArgs{
    tracks: Track[] | undefined
    addTrackInLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown> | void
}

const ListTrackForRecommendations: React.FunctionComponent<ListTrackForRecommendations> = React.memo(({
    tracks,
    userId,
    playlistId,
    addTrackInLibrary
}) => {
    return (
        <ListTrack>
            {tracks?.map((track, index) =>
                <ItemTrack key={track.id}
                    style={{
                        gridTemplateColumns: GRID_TEMPLATE_FOR_RECOMMENDATIONS,
                        animationDelay: `.${index}s`,
                    }}
                >
                    <AvatarTitleAuthor avatarTrack={track.avatar}
                        nameAuthorTrack={track.author.name}
                        nameTrack={track.name}
                    />
                    <AlbumName nameAlbumTrack={track.album?.name} />
                    <ButtonShared type='submit'
                        onClickButton={async () => await addTrackInLibrary({ userId: userId, playlistId: playlistId, trackId: track.id })}
                        style={{ color: '#fff', background: 'none', border: '1px solid #1ed760', fontSize: '14px' }}
                    >
                        Добавить
                    </ButtonShared>
                </ItemTrack>
            )}
        </ListTrack>
    )
})

export default ListTrackForRecommendations
