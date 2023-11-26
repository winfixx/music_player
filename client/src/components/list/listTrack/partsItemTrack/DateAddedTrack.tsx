import * as React from 'react'
import styles from './DateAddedTrack.module.scss';

interface IDateAddedTrackProps {
    dateAddedTrackInPlaylist: string | undefined
}

const DateAddedTrack: React.FunctionComponent<IDateAddedTrackProps> = ({
    dateAddedTrackInPlaylist
}) => {
    return (
        <div className={styles.date_added_track}>
            {dateAddedTrackInPlaylist && dateAddedTrackInPlaylist.split('T')[0]}
        </div>
    )
}

export default DateAddedTrack
