import * as React from 'react'
import { RiMusic2Line } from "react-icons/ri"
import styles from './Heading.module.scss'
import { Playlist } from '../../types/Playlist'
import { SERVER_API } from '../../constants/constants'
import { NavLink } from 'react-router-dom'

interface HeadingProps {
    data: Playlist | undefined
    heading: string
}

const Heading: React.FunctionComponent<HeadingProps> = ({ data, heading }) => {
    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.avatar}>
                <div className={styles.img}>
                    {data?.avatar
                        ? <img src={`${SERVER_API}/${data?.avatar}`} alt="" />
                        : <RiMusic2Line />
                    }
                </div>
            </div>

            <div className={styles.infos}>
                <span className={styles.heading}>{heading}</span>
                <span className={styles.title}>{data?.name}</span>
                <div className={styles['extra__info']}>
                    <span><NavLink to={''}>{data?.author?.name}</NavLink></span>
                </div>
            </div>
        </div>
    )
}

export default Heading
