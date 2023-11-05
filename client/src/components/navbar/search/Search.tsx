import * as React from 'react'
import styles from './Search.module.scss'
import { RiSearchLine } from 'react-icons/ri'
import { MdClear } from 'react-icons/md'
import useDebounce from '../../../hooks/useDebounce'

interface SearchProps {
}

interface SearchValues {
    searchData: string
}


const Search: React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement>> =
    React.forwardRef<HTMLInputElement>((
        props,
        ref
    ) => {
        const [searchData, setSearchData] = React.useState('')
        const debounce = useDebounce<string, number>(searchData, 500)

        const handleSearch = () => {
            console.log(searchData)
        }

        React.useEffect(() => {
            if (debounce) {
                handleSearch()
            }
        }, [debounce])

        return (
            <div className={styles.search} >
                <div>
                    <form onSubmit={event => event.preventDefault()}>
                        <input ref={ref}
                            onChange={event => setSearchData(event.target.value)}
                            value={searchData}
                            type="text"
                            placeholder='Что хочешь послушать?'
                            autoComplete='off'
                        />
                    </form>

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
            </div>
        )
    }
    )

export default Search
