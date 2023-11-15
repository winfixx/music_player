import * as React from 'react'
import styles from './ButtonShared.module.scss'

interface ButtonSharedProps {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    text: string
    onClickButton?: () => void
}

const ButtonShared: React.FunctionComponent<ButtonSharedProps> = ({
    type,
    text,
    onClickButton
}) => {
    return (
        <button onClick={onClickButton} className={styles.go} type={type}>
            {text}
        </button>
    )
}

export default ButtonShared
