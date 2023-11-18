import * as React from 'react'
import { useParams } from 'react-router-dom'
import { FaPlay } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import { IoTimeOutline } from "react-icons/io5"
import styles from './Playlist.module.scss'
import Heading from '../../components/heading/Heading'
import Modal from '../../components/modals/Modal'
import { playlistApi } from '../../api/playlist.api'
import ButtonShared from '../../components/button/button-shared/ButtonShared'
import { useAppSelector } from '../../hooks/redux'

const Playlist: React.FC = () => {
    const { playlistId } = useParams()
    const { data: dataPlaylist } = playlistApi.useGetOnePlaylistQuery(playlistId)
    const user = useAppSelector(state => state.userReducer.user)
    console.log(dataPlaylist)
    return (
        <>
            {/* <Modal /> */}
            <div className={styles.container}>
                <Heading data={dataPlaylist}
                    heading={'Плейлист'}
                />

                <div className={styles.content}>
                    <div className={styles.background} />
                    <div className={styles['button__menu']}>
                        <ButtonShared style={{ padding: '20px', marginRight: '10px' }} type='button'><FaPlay fill={'#000'} /></ButtonShared>
                        {dataPlaylist?.author?.name === user.name
                            ? <></>
                            : <></>
                        }
                        <div className={styles.setting}>
                            <button>
                                <BsThreeDots />
                            </button>
                        </div>
                    </div>
                    {dataPlaylist?.author?.name === user.name
                        && <div>
                            {/* search */}
                        </div>
                    }
                    <div className={styles.tracks}>
                        <div className={styles['track__menu-block']}>
                            <div className={styles['track__menu-grid']}>
                                <div><span id={styles.index}>#</span></div>
                                <div className={styles.title__track}><span>Название</span></div>
                                <div><span>Альбом</span></div>
                                <div><span>Дата добавления</span></div>
                                <div><IoTimeOutline /></div>
                            </div>
                        </div>
                        <div className={styles.list__tracks}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Playlist
