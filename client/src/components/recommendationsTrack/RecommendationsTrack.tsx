import * as React from 'react'
import { Track } from '../../types/Track.type'
import ListTrackForRecommendations from '../list/listTrack/ListTrackForRecommendations'
import styles from './RecommendationsTrack.module.scss'
import { PickIdsPlaylistArgs } from '../../types/PlaylistArgs.type'

interface RecommendationsTrackProps extends PickIdsPlaylistArgs {
    tracks: Track[] | undefined
    addTrackInLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const RecommendationsTrack: React.FunctionComponent<RecommendationsTrackProps> = ({
    tracks,
    userId,
    playlistId,
    addTrackInLibrary
}) => {
    return (
        <div className={styles.rec}>
            <div>
                <div className={styles.heading}>
                    <div>
                        <span>Рекомендации</span>
                        <span>Похоже на треки из этого плейлиста</span>
                    </div>
                </div>

                <ListTrackForRecommendations tracks={tracks}
                    addTrackInLibrary={addTrackInLibrary}
                    userId={userId}
                    playlistId={playlistId}
                />
            </div>
        </div>
    )
}

export default RecommendationsTrack
