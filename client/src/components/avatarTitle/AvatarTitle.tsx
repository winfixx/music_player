import * as React from 'react'
import { RiMusic2Line } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { PROFILE_ROUTE, SERVER_API } from '../../constants/constants'
import styles from './AvatarTitle.module.scss'

interface IAvatarTitleProps {
    avatar: string
    name: string
    nameAuthor: string
    idAuthor: number | null
    pathToTitle: string,
    type?: 'Альбом' | 'Плейлист'
}

const AvatarTitle: React.FunctionComponent<IAvatarTitleProps> = ({
    avatar,
    nameAuthor,
    name,
    idAuthor,
    pathToTitle,
    type
}) => {
    return (
        <div className={styles['main-infos']}>
            {avatar
                ? <img className={styles.avatar__custom} src={`${SERVER_API}/image/${avatar}`} alt='' />
                : <span className={styles.avatar__default}><RiMusic2Line /></span>
            }

            <div className={styles.naming}>
                <NavLink to={`${pathToTitle}`}
                    className={styles.name}
                >
                    {name}
                </NavLink>
                <div>
                    {type
                        && <>
                            <span>{type}</span>
                            <span> &#9679;</span>
                        </>
                    }
                    <NavLink to={`/${PROFILE_ROUTE}/${idAuthor}`}
                        className={styles.name__author}
                    >
                        {nameAuthor}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default AvatarTitle
