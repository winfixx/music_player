import * as React from 'react'
import styles from './ButtonMenu.module.scss'

interface IButtonMenuProps {
    onClick: (() => void) | undefined
    text: string
    icon: React.ReactNode
}

const ButtonMenu: React.FunctionComponent<IButtonMenuProps> = ({
    onClick,
    text,
    icon
}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {icon}
            <span>{text}</span>
        </button>
    )
}

export default ButtonMenu
