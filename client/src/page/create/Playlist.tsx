import * as React from 'react'
import styles from './Playlist.module.scss'
import Heading from '../../components/heading/Heading'

const Playlist: React.FunctionComponent = () => {
    return (
        <div className={styles.container}>
            <Heading />

            <div className={styles.content}>
                <div className={styles.background} />
            </div>
        </div>
    )
}

export default Playlist
