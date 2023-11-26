import * as React from 'react'
import styles from './FieldDescriptionTrack.module.scss'
import { IoTimeOutline } from 'react-icons/io5'

interface FieldDescriptionTrackProps {
    playlist: boolean
    gridTemplateColumns?: string
}

const FieldDescriptionTrack: React.FunctionComponent<FieldDescriptionTrackProps> = React.memo(({
    playlist,
    gridTemplateColumns
}) => {
    return (
        <div className={styles['description-field__track']}>
            <div style={{ gridTemplateColumns }}
                className={styles['track__menu-grid']}
            >
                <div><span id={styles.index}>#</span></div>
                <div className={styles.title__track}><span>Название</span></div>
                {playlist
                    && <>
                        <div><span>Альбом</span></div>
                        <div className={styles.date_add_track}><span>Дата добавления</span></div>
                    </>
                }
                <div className={styles.times}><IoTimeOutline /></div>
            </div>
        </div>
    )
})

export default FieldDescriptionTrack
