import * as React from 'react'
import { VscLibrary } from 'react-icons/vsc'
import { BsPlusLg } from 'react-icons/bs'
import { GoArrowRight } from "react-icons/go"
import { useNavigate } from 'react-router-dom'
import styles from './setting.module.scss'
import { playlistApi } from '../../../api/playlist.api'
import { useAppSelector } from '../../../hooks/redux'
import Modal from '../../modals/Modal'
import { ErrorReponse } from '../../../api/api'
import ContextMenu from './menu/ContextMenu'

const Setting: React.FC = React.memo(() => {
    const [showMenu, setShowMenu] = React.useState(false)
    const [showModalError, setShowModalError] = React.useState(false)
    const navigate = useNavigate()

    const userId = useAppSelector(state => state.userReducer.user.id)
    const [createPlaylist, { isError: isErrorQuery, isSuccess: isSuccessQuery, error: errorQuery, data: dataPlaylist }] = playlistApi.useCreatePlaylistMutation()

    React.useEffect(() => {
        if (isErrorQuery) setShowModalError(!showModalError)
    }, [isErrorQuery])

    React.useEffect(() => {
        if (isSuccessQuery) {
            navigate(`/playlist/${dataPlaylist?.id}`)
        }
    }, [isSuccessQuery])

    const onCreatePlaylist = async () => {
        try {
            await createPlaylist({ userId })
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
                    errorMessage={(errorQuery as ErrorReponse)?.data?.message}
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
                            && <ContextMenu onCreatePlaylist={onCreatePlaylist}
                                onShowMenu={() => setShowMenu(!showMenu)}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
})

export default Setting
