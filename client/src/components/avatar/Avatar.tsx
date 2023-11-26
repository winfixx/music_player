import * as React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { GiTrashCan } from "react-icons/gi"
import { GoPencil } from 'react-icons/go'
import { PiMountains } from "react-icons/pi"
import { RiMusic2Line } from 'react-icons/ri'
import { SERVER_API } from '../../constants/constants'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import ButtonMenu from '../button/button-menu/ButtonMenu'
import ContextMenu from '../menu/ContextMenu'
import styles from './Avatar.module.scss'

interface IAvatarProps {
    avatar: string | undefined
    infos?: ChangeInfoHeading
    avatarPreview?: string
    style: React.CSSProperties
    allowChange: boolean
    changeModal: boolean
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onImgLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
    onShowModal?: () => void
    onDeleteAvatar?: () => void
}

const Avatar: React.FunctionComponent<IAvatarProps> = React.memo(({
    avatar,
    infos,
    avatarPreview,
    style,
    allowChange,
    changeModal,
    onFileChange,
    onImgLoad,
    onShowModal,
    onDeleteAvatar
}) => {
    const inputFileRef = React.useRef<HTMLInputElement>(null)

    const onBtnClick = React.useCallback(() => {
        inputFileRef.current?.click()
    }, [])

    return (
        <div className={styles.avatar} style={style}>
            {changeModal && allowChange
                && <label htmlFor='avatar' className={styles['file-avatar']}>
                    <input id='avatar' ref={inputFileRef} type="file" onChange={onFileChange} hidden />
                </label>
            }

            <div className={styles.img}>
                {avatar
                    ? infos?.avatar
                        ? <img onLoad={onImgLoad} src={avatarPreview} alt="" />
                        : <img src={`${SERVER_API}/image/${avatar}`} alt="" />
                    : infos?.avatar
                        ? <img onLoad={onImgLoad} src={avatarPreview} alt="" />
                        : <RiMusic2Line />
                }
            </div>
            {allowChange
                && <div onClick={onShowModal} className={styles.change__img}>
                    <div />
                    <GoPencil fill={'#fff'} />
                    <span>Выбрать фото</span>
                </div>
            }
            {changeModal
                && <div className={styles.settings}>
                    <BsThreeDots />
                    <ContextMenu>
                        <ButtonMenu icon={<PiMountains />}
                            text='Сменить фото'
                            onClick={onBtnClick}
                        />
                        <ButtonMenu icon={<GiTrashCan />}
                            text='Удалить фото'
                            onClick={onDeleteAvatar}
                        />
                    </ContextMenu>
                </div>
            }
        </div>
    )
})

export default Avatar
