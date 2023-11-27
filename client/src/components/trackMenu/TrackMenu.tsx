import * as React from 'react'
import { BsPerson } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { MdDeleteOutline } from 'react-icons/md'
import { PickIdsPlaylistArgs } from '../../types/PlaylistArgs.type'
import ButtonMenu from '../button/button-menu/ButtonMenu'
import ButtonShared from '../button/button-shared/ButtonShared'
import ThreeDots from '../button/threeDots/ThreeDots'
import FavouriteButton from '../favouriteButton/FavouriteButton'
import ContextMenu from '../menu/ContextMenu'
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
    const [showMenu, setShowMenu] = React.useState(false)

    return (
        <div className={styles.menu}>
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
                    <ThreeDots style={{ width: 30, height: 25 }}
                        onClick={() => setShowMenu(!showMenu)}
                    />
                    {showMenu
                        && <ContextMenu style={{ top: 0, right: 30 }}
                            setShowMenu={setShowMenu}
                            showMenu={showMenu}
                        >
                            <ButtonMenu icon={<BsPerson />}
                                onClick={() => { }}
                                text='Удалить из профиля'
                            />
                            <ButtonMenu icon={<MdDeleteOutline />}
                                onClick={() => { }}
                                text='Удалить плейлист'
                            />
                            <ButtonMenu icon={<GoPencil />}
                                onClick={() => { }}
                                text='Изменение сведений'
                            />
                        </ContextMenu>
                    }
                </div>
            </div>
        </div>
    )
})

export default TrackMenu
