import * as React from 'react'
import { MdClear } from 'react-icons/md'
import styles from './Modal.module.scss'
import ButtonShared from '../button/button-shared/ButtonShared'
import { BiErrorAlt } from 'react-icons/bi'

interface IModalProps {
    children?: React.ReactNode
    typeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    textButton: React.ReactNode
    titleModal: string
    onClickClear: () => void
    onClickButton: () => void
    error: boolean
    errorMessage: string
}

const Modal: React.FunctionComponent<IModalProps> = ({
    children,
    typeButton,
    textButton,
    titleModal,
    onClickClear,
    onClickButton,
    error,
    errorMessage
}) => {
    const ref = React.useRef<HTMLDivElement>(null)

    return (
        <div onClick={onClickClear} className={styles.container}>
            <div onClick={e => e.stopPropagation()} ref={ref}>
                <div className={styles.upper}>
                    <div className={styles.title}>
                        <span>{titleModal}</span>
                    </div>
                    <div onClick={onClickClear} className={styles.clear}>{<MdClear />}</div>
                </div>

                {error
                    && <span className={styles.error__message}>
                        {<BiErrorAlt />} {errorMessage || 'Непредвиденная ошибка'}
                    </span>
                }

                {children}

                <div className={styles.button}>
                    <ButtonShared onClickButton={onClickButton} type={typeButton}>{textButton}</ButtonShared>
                </div>
            </div>
        </div>
    )
}

export default Modal
