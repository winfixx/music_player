import * as React from 'react'
import { MdClear } from 'react-icons/md'
import { RiSearchLine } from 'react-icons/ri'
import useDebounce from '../../../hooks/useDebounce'
import styles from './SearchInput.module.scss'

interface SearchProps {
    style?: React.CSSProperties,
    handleSearch: (debounce: string) => void,
    placeholder: string
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({
    style,
    handleSearch,
    placeholder
},
    ref
) => {
    const [searchData, setSearchData] = React.useState('')
    const debounce = useDebounce<string, number>(searchData, 500)

    React.useEffect(() => {
        handleSearch(debounce)
    }, [debounce, searchData])

    return (
        <div className={styles.search}>
            <input ref={ref}
                onChange={event => setSearchData(event.target.value)}
                value={searchData}
                type="text"
                placeholder={placeholder}
                autoComplete='off'
                style={style}
            />

            <div className={styles.icons__search}>
                <span>{<RiSearchLine />}</span>
            </div>

            {searchData
                && <div className={styles['clear__input-search']}>
                    <span onClick={() => setSearchData('')} >
                        {<MdClear />}
                    </span>
                </div>
            }
        </div>
    )
})

export default Search
