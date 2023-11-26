import * as React from 'react'
import { PickIdsPlaylistArgs } from '../../../../types/PlaylistArgs.type'
import ThreeDots from '../../../button/threeDots/ThreeDots'
import FavouriteButton from '../../../favouriteButton/FavouriteButton'
import styles from './TimeTrack.module.scss'

interface ITimeTrackProps extends PickIdsPlaylistArgs {
    time: string
    haveInPlaylist: boolean
    author: boolean
    addInPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteFromPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const TimeTrack: React.FunctionComponent<ITimeTrackProps> = ({
    time,
    author,
    haveInPlaylist,
    userId,
    playlistId,
    trackId,
    addInPlaylist,
    deleteFromPlaylist
}) => {
    return <div className={styles.time}>
        <FavouriteButton style={{ width: 15, height: 15 }}
            onClickAdd={addInPlaylist}
            onClickDelete={deleteFromPlaylist}
            author={author}
            haveInLibrary={haveInPlaylist}
            userId={userId}
            playlistId={playlistId}
            trackId={trackId}
        />
        <span>{time}</span>
        <ThreeDots style={{ width: 20, height: 20 }} />
    </div>
}

export default TimeTrack
