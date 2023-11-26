import * as React from 'react'
import { RiMusic2Line } from 'react-icons/ri'
import styles from './AvatarTitleAuthor.module.scss'
import { NavLink } from 'react-router-dom'
import { SERVER_API } from '../../../../constants/constants'

interface IAvatarTitleAuthorProps {
    avatarTrack: string
    nameTrack: string
    nameAuthorTrack: string
}

const AvatarTitleAuthor: React.FunctionComponent<IAvatarTitleAuthorProps> = ({
    avatarTrack,
    nameAuthorTrack,
    nameTrack
}) => {
    return (
        <div className={styles['main-infos__track']}>
            {avatarTrack
                ? <img className={styles.avatar__custom} src={`${SERVER_API}/${avatarTrack}`} alt='' />
                : <span className={styles.avatar__default}><RiMusic2Line /></span>
            }
            <div className={styles.naming__track}>
                <NavLink to={''} className={styles.name__track}>{nameTrack}</NavLink>
                <NavLink to={''} className={styles.name__author}>{nameAuthorTrack}</NavLink>
            </div>
        </div>
    )
}

export default AvatarTitleAuthor
