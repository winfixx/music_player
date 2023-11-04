import * as React from 'react'
import { MdClear } from 'react-icons/md'
import { CSSTransition } from 'react-transition-group'
import { RiSearchLine } from 'react-icons/ri'
import styles from './SearchLibrary.module.scss'
import './SearchLibrary.css'
import SelectSorting from './SelectSorting'

interface SearchLibraryProps {
}

const SearchLibrary: React.FC<SearchLibraryProps> = React.memo((props) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [showSearch, setShowSearch] = React.useState(false)

  const open = () => {
    setShowSearch(!showSearch)
  }

  return (
    <section className={styles.search}>
      <div>
        <span className={showSearch ? `${styles.button} ${styles.active}` : styles.button}
          onClick={open}
        >
          {<RiSearchLine size={19} />}
        </span>

        <CSSTransition in={showSearch}
          timeout={120}
          classNames={'search'}
          unmountOnExit
        >
          <input className={styles['input-search']}
            type="text"
            placeholder='Искать в медиатеке'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </CSSTransition>

        {searchValue
          && <span className={styles['clear-search']}
            onClick={() => setSearchValue('')}
          >
            {<MdClear />}
          </span>}
      </div>

      <SelectSorting />
    </section>
  )
})

export default SearchLibrary
