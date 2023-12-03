import * as React from 'react'
import { BsPerson, BsPlusLg } from 'react-icons/bs'
import { IoMdArrowDropright } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'
import { RiAlbumLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { ALBUM_ROUTE, PROFILE_ROUTE } from '../../../../constants/constants'
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
    authorId: number | null
    albumId: number | null | undefined
    addInPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteTrackFromPlaylist: (args: PickIdsPlaylistArgs) => Promise<unknown>
    deleteTrack?: () => void
}

const TimeTrack: React.FunctionComponent<ITimeTrackProps> = ({
    time,
    author,
    haveInPlaylist,
    userId,
    playlistId,
    albumId,
    trackId,
    authorId,
    addInPlaylist,
    deleteTrackFromPlaylist
}) => {
    const [showMenu, setShowMenu] = React.useState(false)
    const navigate = useNavigate()

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
                    onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu
                    && <ContextMenu style={{ top: 0, right: 25 }}
                        setShowMenu={setShowMenu}
                        showMenu={showMenu}
                    >
                        <ButtonMenu icon={<BsPlusLg />}
                            onClick={() => { }}
                            text='Добавить в плейлист'
                            unwrap={<IoMdArrowDropright />}
                        />
                        <ButtonMenu icon={<BsPerson />}
                            onClick={() => navigate(`/${PROFILE_ROUTE}/${authorId}`)}
                            text='К исполнителю'
                        />
                        <ButtonMenu icon={<RiAlbumLine />}
                            onClick={() => navigate(`/${ALBUM_ROUTE}/${albumId}`)}
                            text='К альбому'
                        />
                        {authorId === userId
                            && < ButtonMenu icon={<MdDeleteOutline />}
                                onClick={() => { }}
                                text='Удалить трек'
                            />
                        }
                    </ContextMenu>
                }
            </div>
        </div >
    )
}

export default TimeTrack
