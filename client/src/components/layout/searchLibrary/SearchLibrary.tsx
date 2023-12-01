import * as React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useClickOutside } from '../../../hooks/useClickOutside'
import Search from '../../input/search-input/SearchInput'
import styles from './SearchLibrary.module.scss'
import SelectSorting from './selectSorting/SelectSorting'

interface SearchLibraryProps {
  handleSearch: (name: string) => void
}

const SearchLibrary: React.FC<SearchLibraryProps> = React.memo(({
  handleSearch
}) => {
  const [showSearch, setShowSearch] = React.useState(false)
  const ref = React.useRef(null)
  useClickOutside(ref, () => setShowSearch(!showSearch))

  return (
    <div className={styles.search}>
      <div>
        {showSearch
          ? <div className={styles.search__input} ref={ref}>
            <Search handleSearch={handleSearch}
              placeholder='Искать в медиатеке'
              style={{ borderRadius: 4, outline: 'none', fontSize: 13 }}
            />
          </div>
          : <span className={styles.open_button}
            onClick={() => setShowSearch(!showSearch)}
          >
            {<RiSearchLine fill={showSearch ? '#fff' : '#A7A7A7'} size={19} />}
          </span>
        }
      </div>

      <SelectSorting />
    </div>
  )
})

export default SearchLibrary
