import * as React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import styles from './ThreeDots.module.scss'

interface IThreeDotsProps {
    style: React.CSSProperties
    onClick: () => void
}

const ThreeDots: React.FunctionComponent<IThreeDotsProps> = ({
    style,
    onClick
}) => {
    return (
        <button className={styles.button}
            style={style}
            onClick={onClick}
        >
            <BsThreeDots />
        </button>
    )
}

export default ThreeDots
