import * as React from 'react'
import Filter from '../filter/Filter'
import SearchLibrary from '../searchLibrary/SearchLibrary'
import Setting from '../setting/Setting'
import styles from './Library.module.scss'

interface ILibraryProps {
}

const Library: React.FunctionComponent<ILibraryProps> = (props) => {
    

    return (
        <section className={styles.layout}>
            <Setting />
            <Filter />

            <div className={styles.content}>
                <SearchLibrary />

                <div className={styles.list}>
                    {/* list playlist, album, folder */}
                </div>
            </div>
        </section>
    )
}

export default Library
