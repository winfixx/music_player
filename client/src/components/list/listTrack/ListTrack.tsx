import * as React from 'react'
import styles from './ListTrack.module.scss'

interface IListTrackProps {
    children: React.ReactNode
}

const ListTrack: React.FunctionComponent<IListTrackProps> = React.memo(({
    children
}) => {
    return (
        <div className={styles['list__tracks']} >
            {children}
        </div>
    )
})

export default ListTrack
