import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import styles from './Heading.module.scss'

interface HeadingProps {
    heading: string
    avatar: string | undefined
    name: string | undefined
    authorName: string | undefined
    createdAt: string | undefined | null
    countTrack: number | undefined
    userId: number | undefined | null
    authorId: number | undefined | null
    onShowModal: () => void
}

const Heading: React.FunctionComponent<HeadingProps> = ({
    heading,
    avatar,
    name,
    authorName,
    createdAt,
    countTrack,
    authorId,
    userId,
    onShowModal
}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.under}>
            <div className={styles.background} />

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
                        && <span onClick={() => navigate}><NavLink to={''}>{authorName}</NavLink></span>
                    }
                    {createdAt
                        && <>
                            <span> &#9679;</span>
                            <span>{createdAt}</span>
                        </>
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
