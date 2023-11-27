import * as React from 'react'
import styles from './ButtonMenu.module.scss'

interface IButtonMenuProps {
    onClick: (() => void) | undefined
    text: string
    icon: React.ReactNode
    unwrap?: React.ReactNode
}

const ButtonMenu: React.FunctionComponent<IButtonMenuProps> = ({
    onClick,
    text,
    icon,
    unwrap
}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <div>
                {icon}
                <span>{text}</span>
            </div>
            {unwrap}
        </button>
    )
}

export default ButtonMenu
