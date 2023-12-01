import * as React from 'react'
import { GRID_TEMPLATE_FOR_RECOMMENDATIONS, TRACK_ROUTE } from '../../../constants/constants'
import { PickIdsPlaylistArgs } from '../../../types/PlaylistArgs.type'
import { Track } from '../../../types/Track.type'
import AvatarTitle from '../../avatarTitle/AvatarTitle'
import ButtonShared from '../../button/button-shared/ButtonShared'
import ItemTrack from './ItemTrack'
import ListTrack from './ListTrack'
import AlbumName from './partsItemTrack/AlbumName'

interface ListTrackForRecommendations extends PickIdsPlaylistArgs {
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
                    <AvatarTitle avatar={track.avatar}
                        nameAuthor={track.author.name}
                        name={track.name}
                        idAuthor={track.author.id}
                        pathToTitle={`/${TRACK_ROUTE}/${track.id}`}
                    />
                    <AlbumName nameAlbumTrack={track.album?.name}
                        idAlbum={track.album?.id}
                    />
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
