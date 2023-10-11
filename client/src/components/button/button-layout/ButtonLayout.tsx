import * as React from 'react'
import styles from './ButtonLayout.module.scss'

interface IButtonProps {
    children: React.ReactNode
    onClick?: () => void
    clear?: boolean,
    activePlaylist?: boolean
    activeName?: boolean
}

const Button: React.FC<IButtonProps> = React.memo(({
    children,
    onClick,
    clear,
    activePlaylist,
    activeName
}) => {
    if (activePlaylist) {
        return <span  className={`${styles.span} ${styles.activePlaylist}`}>
            <button onClick={onClick}>
                {children}
            </button>
        </span>
    }

    if (activeName) {
        return <span  className={`${styles.span} ${styles.activeName}`}>
            <button onClick={onClick}>
                {children}
            </button>
        </span>
    }

    return (
        <span className={styles.span}>
            <button className={clear ? styles.clear : styles.button}
                onClick={onClick}
            >
                {children}
            </button>
        </span>
    )
})

export default Button
