import * as React from 'react'
import { PickIdsPlaylistArgs } from '../../../../types/PlaylistArgs.type'
import ThreeDots from '../../../button/threeDots/ThreeDots'
import FavouriteButton from '../../../favouriteButton/FavouriteButton'
import styles from './TimeTrack.module.scss'

interface ITimeTrackProps extends PickIdsPlaylistArgs {
    time: string
    haveInPlaylist: boolean
    author: boolean
    children: React.ReactNode
    showMenu: number | null
    setShowMenu: (args: number | null) => void
    addInPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteTrackFromPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const TimeTrack: React.FunctionComponent<ITimeTrackProps> = ({
    time,
    author,
    haveInPlaylist,
    userId,
    playlistId,
    trackId,
    children: childrenContextModal,
    showMenu,
    setShowMenu,
    addInPlaylist,
    deleteTrackFromPlaylist
}) => {
    return (
        <div className={styles.time}>
            <FavouriteButton style={{ width: 15, height: 15 }}
                onClickAdd={addInPlaylist}
                onClickDelete={deleteTrackFromPlaylist}
                author={author}
                haveInLibrary={haveInPlaylist}
                userId={userId}
                playlistId={playlistId}
                trackId={trackId}
            />
            <span>{time}</span>
            <div className={styles.setting}>
                <ThreeDots style={{ width: 20, height: 20 }}
                    onClick={() => setShowMenu(showMenu)}
                />
                {childrenContextModal}
            </div>
        </div >
    )
}

export default TimeTrack
