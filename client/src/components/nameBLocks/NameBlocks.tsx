import * as React from 'react'
import styles from './NameBlocks.module.scss'

interface INameBlocksProps {
    title: string,
    mainInfo: string
}

const NameBlocks: React.FunctionComponent<INameBlocksProps> = ({
    title,
    mainInfo
}) => {
    return (
        <div className={styles.heading}>
            <div>
                <span>{title}</span>
                <span>{mainInfo}</span>
            </div>
        </div>
    )
}

export default NameBlocks
