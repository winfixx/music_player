import * as React from 'react'
import styles from './Loader.module.scss';

interface ILoaderProps {
}

const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
    return (
        <div className={styles.loader}>
            <span className={styles.spinner}></span>
        </div>
    )
}

export default Loader
