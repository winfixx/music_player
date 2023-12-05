import * as React from 'react'
import { RiMusic2Line } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { PROFILE_ROUTE, SERVER_API } from '../../constants/constants'
import ImageAvatar from '../img/ImageAvatar'
import styles from './AvatarTitle.module.scss'

interface IAvatarTitleProps {
    avatar: string | undefined
    name: string | undefined
    nameAuthor: string | undefined
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
            <div className={styles.avatar__div}>
                {avatar
                    ? <ImageAvatar borderRadius='2px'
                        sizeHight='100%'
                        sizeWidth='100%'
                        src={`${SERVER_API}/image/${avatar}`}
                    />
                    : <RiMusic2Line />
                }
            </div>

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
