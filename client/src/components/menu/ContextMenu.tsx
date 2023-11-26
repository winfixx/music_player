import * as React from 'react'
import styles from './ContextMenu.module.scss'

interface ContextMenuProps {
    children: React.ReactNode
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
    children
}) => {
    return (
        <div className={styles['context-menu']}>
            {children}
        </div>
    )
}

export default ContextMenu
