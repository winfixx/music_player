import * as React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { GoArrowRight } from "react-icons/go"
import { MdOutlineFolder, MdOutlinePlaylistAdd } from 'react-icons/md'
import { RiAlbumLine } from 'react-icons/ri'
import { VscLibrary } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { albumApi } from '../../../api/rtk/album.api'
import { ErrorResponse } from '../../../api/rtk/api'
import { playlistApi } from '../../../api/rtk/playlist.api'
import { ALBUM_ROUTE, PLAYLIST_ROUTE } from '../../../constants/constants'
import { useAppSelector } from '../../../hooks/redux'
import ButtonMenu from '../../button/button-menu/ButtonMenu'
import ContextMenu from '../../menu/ContextMenu'
import Modal from '../../modals/defaultModal/Modal'
import styles from './setting.module.scss'

const Setting: React.FC = React.memo(() => {
    const [showMenu, setShowMenu] = React.useState(false)
    const [showModalError, setShowModalError] = React.useState(false)
    const navigate = useNavigate()

    const userId = useAppSelector(state => state.userReducer.user.id)
    const [createPlaylist, { isError: isErrorPlaylist, isSuccess: isSuccessPlaylist, error: errorPlaylist, data: dataPlaylist }] = playlistApi.useCreatePlaylistMutation()
    const [createAlbum, { isError: isErrorAlbum, isSuccess: isSuccessAlbum, error: errorAlbum, data: dataAlbum }] = albumApi.useCreateAlbumMutation()

    React.useEffect(() => {
        if (isErrorPlaylist) return setShowModalError(!showModalError)
        if (isErrorAlbum) return setShowModalError(!showModalError)
    }, [isErrorPlaylist, isErrorAlbum])

    React.useEffect(() => {
        if (isSuccessPlaylist) return navigate(`/${PLAYLIST_ROUTE}/${dataPlaylist?.id}`)
        if (isSuccessAlbum) return navigate(`/${ALBUM_ROUTE}/${dataAlbum?.id}`)
    }, [isSuccessPlaylist, isSuccessAlbum])

    const onCreatePlaylist = async () => {
        try {
            await createPlaylist(userId)
                .finally(() => setShowMenu(!showMenu))
        } catch (error) {
            console.log(error)
        }
    }

    const onCreateAlbum = async () => {
        try {
            await createAlbum(userId)
                .finally(() => setShowMenu(!showMenu))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {showModalError
                && <Modal onClickClear={() => setShowModalError(!showModalError)}
                    onClickButton={() => setShowModalError(!showModalError)}
                    textButton='Хорошо'
                    titleModal='Упс... Ошибка'
                    typeButton='button'
                    error={true}
                    errorMessage={errorPlaylist
                        ? (errorPlaylist as ErrorResponse)?.data?.message
                        : (errorAlbum as ErrorResponse)?.data?.message
                    }
                />
            }
            <div className={styles.settings}>
                <div>
                    <div className={styles.media}>
                        <span>{<VscLibrary size={25} />}</span> Моя медиатека
                    </div>

                    <div className={styles.button}>
                        <span onClick={() => setShowMenu(!showMenu)}>{<BsPlusLg size={22.5} />}</span>
                        <span>{<GoArrowRight size={22.5} />}</span>

                        {showMenu
                            && <ContextMenu style={{ top: 30, left: 0 }}
                                setShowMenu={setShowMenu}
                                showMenu={showMenu}
                            >
                                <ButtonMenu onClick={onCreatePlaylist}
                                    text='Создать плейлист'
                                    icon={< MdOutlinePlaylistAdd />}
                                />
                                <ButtonMenu onClick={onCreateAlbum}
                                    text='Создать альбом'
                                    icon={<RiAlbumLine />}
                                />
                                <ButtonMenu onClick={() => { }}
                                    text='Создать папку с плейлистами'
                                    icon={< MdOutlineFolder />}
                                />
                            </ContextMenu>
                        }
                    </div>
                </div>
            </div>
        </>
    )
})

export default Setting
