import * as React from 'react'
import { FaPlay } from 'react-icons/fa'
import { PickIdsPlaylistArgs } from '../../types/PlaylistArgs.type'
import ButtonShared from '../button/button-shared/ButtonShared'
import ThreeDots from '../button/threeDots/ThreeDots'
import FavouriteButton from '../favouriteButton/FavouriteButton'
import styles from './TrackMenu.module.scss'

interface ITrackMenuProps {
    haveInLibrary: boolean
    author: boolean
    userId?: number | null
    playlistId?: number | undefined | null
    addInLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteFromLibrary: (args: PickIdsPlaylistArgs) => Promise<unknown>
}

const TrackMenu: React.FunctionComponent<ITrackMenuProps> = React.memo(({
    haveInLibrary,
    author,
    playlistId,
    userId,
    addInLibrary,
    deleteFromLibrary
}) => {
    return (
        <div className={styles.menu}>
            <div className={styles.background} />
            <div className={styles['button__menu']}>
                <ButtonShared style={{ padding: '20px', marginRight: '20px' }} type='button'>
                    <FaPlay fill={'#000'} />
                </ButtonShared>

                <FavouriteButton author={author}
                    haveInLibrary={haveInLibrary}
                    onClickAdd={addInLibrary}
                    onClickDelete={deleteFromLibrary}
                    style={{ width: 30, height: 30 }}
                    userId={userId}
                    playlistId={playlistId}
                />

                <div className={styles.setting}>
                    <ThreeDots style={{ width: 30, height: 25 }} />
                </div>
            </div>
        </div>
    )
})

export default TrackMenu
