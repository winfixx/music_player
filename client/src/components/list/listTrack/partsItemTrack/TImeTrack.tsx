import * as React from 'react'
import { BsPerson, BsPlusLg } from 'react-icons/bs'
import { IoMdArrowDropright } from 'react-icons/io'
import { RiAlbumLine } from 'react-icons/ri'
import { PickIdsPlaylistArgs } from '../../../../types/PlaylistArgs.type'
import ButtonMenu from '../../../button/button-menu/ButtonMenu'
import ThreeDots from '../../../button/threeDots/ThreeDots'
import FavouriteButton from '../../../favouriteButton/FavouriteButton'
import ContextMenu from '../../../menu/ContextMenu'
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
    const [showMenu, setShowMenu] = React.useState(false)

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
        <div className={styles.setting}>
            <ThreeDots style={{ width: 20, height: 20 }}
                onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu
                && <ContextMenu style={{ top: 0, right: 25,  }}
                    setShowMenu={setShowMenu}
                    showMenu={showMenu}
                >
                    <ButtonMenu icon={<BsPlusLg />}
                        onClick={() => { }}
                        text='Добавить в плейлист'
                        unwrap={<IoMdArrowDropright />}
                    />
                    <ButtonMenu icon={<BsPerson />}
                        onClick={() => { }}
                        text='К исполнителю'
                    />
                    <ButtonMenu icon={<RiAlbumLine />}
                        onClick={() => { }}
                        text='К альбому'
                    />
                </ContextMenu>
            }
        </div>
    </div >
}

export default TimeTrack
