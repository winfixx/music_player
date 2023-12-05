import * as React from 'react'
import styles from './Home.module.scss'

const div = [
    { id: 1, page: 'page' },
    { id: 2, page: 'page' },
    { id: 3, page: 'page' },
    { id: 4, page: 'page' },
    { id: 5, page: 'page' },
    { id: 6, page: 'page' },
    { id: 7, page: 'page' },
    { id: 8, page: 'page' },
    { id: 10, page: 'page' },
    { id: 11, page: 'page' },
    { id: 12, page: 'page' },
    { id: 13, page: 'page' },
    { id: 14, page: 'page' },
    { id: 15, page: 'page' },
    { id: 16, page: 'page' },
    { id: 17, page: 'page' },
    { id: 18, page: 'page' },
    { id: 181, page: 'page' },
    { id: 182, page: 'page' },
    { id: 128, page: 'page' },
]

const Home: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.background} />
            <div className={styles.content}>
                {div.map(i =>
                    <div className={styles.main} key={i.id}>{i.page}</div>
                )}
            </div>
        </div>
    )
}

export default Home
