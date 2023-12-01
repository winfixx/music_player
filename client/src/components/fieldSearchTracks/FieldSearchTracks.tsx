import * as React from 'react'
import { MdClear } from 'react-icons/md'
import SearchInput from '../input/search-input/SearchInput'
import styles from './FieldSearchTracks.module.scss'
import { Link } from 'react-router-dom'

interface FieldSearchTracksProps {
    handleSearch: (searchData: string) => void
    closeSearch: boolean
    setCloseSearch: (closeSearch: boolean) => void
}

const FieldSearchTracks: React.FunctionComponent<FieldSearchTracksProps> = ({
    handleSearch,
    closeSearch,
    setCloseSearch
}) => {
    return (
        <div id='recommendations' className={styles['search-block']}>
            {closeSearch
                ? <div className={styles.open__search}>
                    <span onClick={() => setCloseSearch(!closeSearch)}>Еще</span>
                </div>
                : <div className={styles['add-track__input']}>
                    <div>
                        <div className={styles.search}>
                            <span>Давай добавим что-нибудь в твой плейлист</span>
                            <div>
                                <SearchInput handleSearch={handleSearch}
                                    style={{ borderRadius: '4px' }}
                                    placeholder='Поиск треков'
                                />
                            </div>
                        </div>
                        <div className={styles.close__search}>
                            <a href='#recommendations' onClick={() => setCloseSearch(!closeSearch)}>{<MdClear />}</a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default FieldSearchTracks
