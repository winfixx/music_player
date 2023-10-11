import * as React from 'react'
import { VscLibrary } from 'react-icons/vsc'
import { BsPlusLg } from 'react-icons/bs'
import { HiOutlineArrowRight } from 'react-icons/hi'
import styles from './setting.module.scss'

interface ISettingProps {
}

const Setting: React.FC<ISettingProps> = React.memo((props) => {
    return (
        <div className={styles.settings}>
            <div>
                <div className={styles.media}>
                    <span>{<VscLibrary size={25} />}</span> Моя медиатека
                </div>
                <div className={styles.button}>
                    <span>{<BsPlusLg size={22.5} />}</span>
                    <span>{<HiOutlineArrowRight size={22.5} />}</span>
                </div>
            </div>
        </div>
    )
})

export default Setting
