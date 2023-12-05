import * as React from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './ContextMenu.module.scss'

interface ContextMenuProps {
    children: React.ReactNode
    style?: React.CSSProperties
    setShowMenu?: (showMenu: number | null) => void
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
    children,
    style,
    setShowMenu
}) => {
    const ref = React.useRef<HTMLDivElement>(null)

    if (setShowMenu) useClickOutside(ref, () => setShowMenu(null))

    return (
        <div ref={ref}
            style={style}
            className={styles['context-menu']}
        >
            {children}
        </div>
    )
}

export default ContextMenu
