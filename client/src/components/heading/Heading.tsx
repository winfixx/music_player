import * as React from 'react'
import styles from './Heading.module.scss'

interface HeadingProps {
}

const Heading: React.FunctionComponent<HeadingProps> = ({

}) => {
    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.avatar}>

            </div>

            <div className={styles.infos}>

            </div>
        </div>
    )
}

export default Heading
