import * as React from 'react'
import styles from './ButtonLayout.module.scss'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    clear?: boolean,
    activePlaylist?: boolean
    activeTitle?: boolean
}

const Button: React.FC<ButtonProps> = React.memo(({
    children,
    onClick,
    clear,
    activePlaylist,
    activeTitle
}) => {
    if (activePlaylist) {
        return <span  className={`${styles.span} ${styles.activePlaylist}`}>
            <button onClick={onClick}>
                {children}
            </button>
        </span>
    }

    if (activeTitle) {
        return <span  className={`${styles.span} ${styles.activeTitle}`}>
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
