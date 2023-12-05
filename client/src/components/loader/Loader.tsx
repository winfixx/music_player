import * as React from 'react'
import styles from './Loader.module.scss'

const Loader: React.FunctionComponent = () => {
    return (
        <div className={styles.loader}>
            <span className={styles.spinner}></span>
        </div>
    )
}

export default Loader
