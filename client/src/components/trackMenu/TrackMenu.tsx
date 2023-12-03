import * as React from 'react'
import { FaPlay } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { MdDeleteOutline, MdDeleteSweep, MdOutlineLibraryAdd } from 'react-icons/md'
import { PickIdsPlaylistArgs } from '../../types/PlaylistArgs.type'
import ButtonMenu from '../button/button-menu/ButtonMenu'
import ButtonShared from '../button/button-shared/ButtonShared'
import ThreeDots from '../button/threeDots/ThreeDots'
import FavouriteButton from '../favouriteButton/FavouriteButton'
import ContextMenu from '../menu/ContextMenu'
import Modal from '../modals/defaultModal/Modal'
import styles from './TrackMenu.module.scss'

interface ITrackMenuProps {
    haveInLibrary: boolean
    author: boolean
    userId?: number | null
    authorId: number | null | undefined
    playlistId?: number | undefined | null
    showChangeInfoModal: boolean
    type: 'плейлист' | 'альбом' | 'трек'
    deleteFrom: 'Любимые треки' | 'медиатеки'
    color?: [f: string, s: string, t: string]
    setShowChangeInfoModal: (args: boolean) => void
    addInLibrary?: (args: PickIdsPlaylistArgs) => Promise<unknown> | void
    deleteFromLibrary?: (args: PickIdsPlaylistArgs) => Promise<unknown> | void
    deleteFromAll?: ((args: any) => Promise<unknown> | void)
}

const TrackMenu: React.FunctionComponent<ITrackMenuProps> = React.memo(({
    haveInLibrary,
    author,
    playlistId,
    authorId,
    userId,
    showChangeInfoModal,
    type,
    color,
    deleteFrom,
    setShowChangeInfoModal,
    addInLibrary,
    deleteFromLibrary,
    deleteFromAll,
}) => {
    const [showMenu, setShowMenu] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)

    const onDeleteFromAll = () => {
        setShowModal(!showModal)
        setShowMenu(!showMenu)
    }
    const onDeleteFromLibrary = async () => {
        setShowMenu(!showMenu)
        if (deleteFromLibrary) await deleteFromLibrary({ userId, playlistId })

    }
    const onAddFromLibrary = async () => {
        setShowMenu(!showMenu)
        if (addInLibrary) await addInLibrary({ userId, playlistId })
    }
    const onChangeInfo = () => {
        setShowChangeInfoModal(!showChangeInfoModal)
        setShowMenu(!showMenu)
    }

    return (
        <>
            {showModal
                && <Modal onClickClear={() => setShowModal(!showModal)}
                    error={false}
                    textButton='Подтвердить'
                    typeButton='submit'
                    onClickButton={deleteFromAll}
                    titleModal='Подтвердити действие'
                >
                    Вы действительно хотите полностью удалить {type}?
                </Modal>
            }

            <div className={styles.menu}
                style={{ background: !!color?.[0] ? `linear-gradient(rgba(${color[0]}, ${color[1]}, ${color[2]}, .5), rgba(${color[0]}, ${color[1]}, ${color[2]}, .009))` : '' }}
            >
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
                                {haveInLibrary
                                    ? <ButtonMenu icon={<MdDeleteSweep />}
                                        onClick={onDeleteFromLibrary}
                                        text={`Удалить из ${deleteFrom}`}
                                    />
                                    : <ButtonMenu icon={<MdOutlineLibraryAdd />}
                                        onClick={onAddFromLibrary}
                                        text={`Добавить в ${deleteFrom}`}
                                    />
                                }
                                {authorId === userId
                                    && <>
                                        <ButtonMenu icon={<MdDeleteOutline />}
                                            onClick={onDeleteFromAll}
                                            text='Удалить'
                                        />
                                        <ButtonMenu icon={<GoPencil />}
                                            onClick={onChangeInfo}
                                            text='Изменение сведений'
                                        />
                                    </>
                                }
                            </ContextMenu>
                        }
                    </div>
                </div>
            </div>
        </>
    )
})

export default TrackMenu
