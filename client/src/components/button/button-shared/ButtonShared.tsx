import * as React from 'react'
import styles from './ButtonShared.module.scss'

interface ButtonSharedProps {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    children: React.ReactNode
    onClickButton?: (args: unknown) => void | Promise<unknown>
    style?: React.CSSProperties
}

const ButtonShared: React.FunctionComponent<ButtonSharedProps> = ({
    type,
    children,
    onClickButton,
    style
}) => {
    return (
        <button onClick={onClickButton}
            style={style}
            className={styles.button}
            type={type}
        >
            {children}
        </button>
    )
}

export default ButtonShared
