import * as React from 'react'
import { MdClear } from 'react-icons/md'
import styles from './Modal.module.scss'
import ButtonShared from '../button/button-shared/ButtonShared'

interface IModalProps {
    children: React.ReactNode
    typeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    textButton: string
    titleModal: string
    onClickClear: () => void
    onClickButton: () => void
}

const Modal: React.FunctionComponent<IModalProps> = ({
    children,
    typeButton,
    textButton,
    titleModal,
    onClickClear,
    onClickButton
}) => {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.upper}>
                    <div className={styles.title}>
                        <span>{titleModal}</span>
                    </div>
                    <div onClick={onClickClear} className={styles.clear}>{<MdClear />}</div>
                </div>

                {children}

                <div className={styles.button}>
                    <ButtonShared onClickButton={onClickButton} type={typeButton} text={textButton} />
                </div>
            </div>
        </div>
    )
}

export default Modal
