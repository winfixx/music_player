import * as React from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { useSetImage } from '../../../hooks/useSetImage'
import { ChangeInfoHeading } from '../../../types/ChangeInfoHeading.type'
import Avatar from '../../avatar/Avatar'
import Modal from '../defaultModal/Modal'
import styles from './ChangeInfoModal.module.scss'


interface IChangeInfoModalProps {
    onClickClear: () => void
    onClickButton: () => void
    avatar: string | undefined
    infos: ChangeInfoHeading
    setInfos: (infos: ChangeInfoHeading) => void
    errorChangeInfo: string
    setErrorChangeInfo: (error: string) => void
}

const ChangeInfoModal: React.FunctionComponent<IChangeInfoModalProps> = ({
    onClickButton,
    onClickClear,
    avatar,
    infos,
    setInfos,
    errorChangeInfo,
    setErrorChangeInfo
}) => {
    const { error, avatarPreview, avatarAsFile, onFileChange, onImgLoad } = useSetImage(errorChangeInfo, setErrorChangeInfo)

    React.useEffect(() => {
        if (error === '') {
            setInfos({ ...infos, avatar: avatarAsFile, deleteAvatar: false })
        }
    }, [avatarPreview, avatarAsFile, error])

    const onDeleteAvatar = React.useCallback(() => {
        setInfos({...infos, avatar: undefined, deleteAvatar: true})
    }, [infos])

    return (
        <Modal error={false}
            onClickClear={onClickClear}
            textButton='Сохранить'
            titleModal='Изменение сведений'
            typeButton='submit'
            onClickButton={onClickButton}
        >
            {error
                && <div className={styles.error}>
                    {<BiErrorAlt />} <span>{error}</span>
                </div>
            }

            <div className={styles.container}>
                <Avatar avatar={avatar}
                    allowChange={true}
                    onFileChange={onFileChange}
                    onImgLoad={onImgLoad}
                    style={{ width: 180, height: 180 }}
                    avatarPreview={avatarPreview}
                    infos={infos}
                    changeModal={true}
                    onDeleteAvatar={onDeleteAvatar}
                />

                <div className={styles['input-form']}>
                    <label htmlFor="">Имя</label>
                    <input className={styles.label}
                        type="text"
                        value={infos.name}
                        onChange={e => setInfos({ ...infos, name: e.target.value })}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ChangeInfoModal
