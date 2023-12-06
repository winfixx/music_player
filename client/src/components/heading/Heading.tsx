import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../constants/constants'
import Avatar from '../avatar/Avatar'
import styles from './Heading.module.scss'

interface HeadingProps {
    heading: string
    avatar: string | undefined
    name: string | undefined
    authorName?: string | undefined
    createdAt?: string | undefined | null
    countTrack?: number | undefined
    countPlaylist?: number | undefined
    countAlbum?: number | undefined
    userId: number | undefined | null
    authorId: number | undefined | null
    color?: [f: string, s: string, t: string]
    isProfile: boolean
    onShowModal: () => void
}

const Heading: React.FunctionComponent<HeadingProps> = ({
    heading,
    avatar,
    name,
    authorName,
    createdAt,
    countTrack,
    countAlbum,
    countPlaylist,
    authorId,
    userId,
    color,
    isProfile,
    onShowModal
}) => {
    const navigate = useNavigate()

    // для сборки
    console.log(countAlbum, countPlaylist)

    return (
        <div className={styles.under}>
            <div className={styles.background}
                style={{ background: !!color?.[0] ? `rgb(${color[0]}, ${color[1]}, ${color[2]})` : '' }}
            />

            <Avatar allowChange={authorId === userId}
                avatar={avatar}
                style={{ width: 192, height: 192 }}
                changeModal={false}
                onShowModal={onShowModal}
            />

            <div className={styles.infos}>
                <span className={styles.heading}>{heading}</span>
                <span onClick={onShowModal} className={styles.title}>{name}</span>
                <div className={styles['extra__info']}>
                    {authorName
                        && <span onClick={() => navigate(`/${PROFILE_ROUTE}/${authorId}`)}>
                            <NavLink to={''}>{authorName}</NavLink>
                        </span>
                    }
                    {createdAt
                        && <>
                            <span> &#9679;</span>
                            <span>{createdAt}</span>
                        </>
                    }
                    {isProfile
                        ? <>
                            {countPlaylist !== undefined && countPlaylist > 0
                                && <>
                                    <span>{countPlaylist} открытых плейлиста</span>
                                </>
                            }
                            {countAlbum !== undefined && countAlbum > 0
                                && <>
                                    <span> &#9679;</span>
                                    <span>{countAlbum} альбома</span>
                                </>
                            }
                        </>
                        : <></>
                    }
                    {countTrack !== undefined && countTrack > 0
                        && <>
                            <span> &#9679;</span>
                            <span>{countTrack} (трек)</span>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Heading
