import * as React from 'react'
import styles from './ItemTrack.module.scss'

interface IItemTrackProps {
    style: React.CSSProperties
    children: React.ReactNode
}

const ItemTrack: React.FunctionComponent<IItemTrackProps> = React.memo(({
    style,
    children
}) => {
    return (
        <div className={styles.track}
            style={style}
        >
            {children}
        </div >
    )
})

export default ItemTrack
