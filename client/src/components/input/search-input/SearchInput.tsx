import * as React from 'react'
import styles from './SearchInput.module.scss'
import { RiSearchLine } from 'react-icons/ri'
import { MdClear } from 'react-icons/md'
import useDebounce from '../../../hooks/useDebounce'

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
        if (debounce) {
            handleSearch(debounce)
        }
    }, [debounce])

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
                <span>{<RiSearchLine size={20} />}</span>
            </div>

            {searchData
                && <div className={styles['clear__input-search']}>
                    <span onClick={() => setSearchData('')} >
                        {<MdClear size={20} />}
                    </span>
                </div>
            }
        </div>
    )
})

export default Search
