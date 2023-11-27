import * as React from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './ContextMenu.module.scss'

interface ContextMenuProps {
    children: React.ReactNode
    style?: React.CSSProperties
    setShowMenu?: (showMenu: boolean) => void
    showMenu?: boolean
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
    children,
    style,
    showMenu,
    setShowMenu
}) => {
    const ref = React.useRef<HTMLDivElement>(null)

    if (setShowMenu) useClickOutside(ref, () => setShowMenu(!showMenu))

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
