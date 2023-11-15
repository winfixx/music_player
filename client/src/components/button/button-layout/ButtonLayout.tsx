import * as React from 'react'
import styles from './ButtonLayout.module.scss'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    clear?: boolean,
    activeType?: boolean
    activeTitle?: boolean
}

const Button: React.FC<ButtonProps> = React.memo(({
    children,
    onClick,
    clear,
    activeType,
    activeTitle
}) => {
    if (activeType) {
        return <span  className={`${styles.span} ${styles.activeType}`}>
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
