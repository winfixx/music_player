import * as React from 'react'
import { MdClear } from 'react-icons/md'
import { CSSTransition } from 'react-transition-group'
import { RiSearchLine } from 'react-icons/ri'
import styles from './input-search.module.scss'
import './input-search.css'
import SelectSorting from './SelectSorting'

interface IInputSearchProps {
}

const InputSearch: React.FC<IInputSearchProps> = React.memo((props) => {
  const [search, setSearch] = React.useState('')
  const [showSearch, setShowSearch] = React.useState(false)
  const ref = React.useRef(null)

  const open = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className={styles.search}>
      <div>
        <span ref={ref} className={showSearch ? `${styles.button} ${styles.active}` : styles.button}
          onClick={open}
        >
          {<RiSearchLine size={19} />}
        </span>
        <CSSTransition in={showSearch}
          timeout={150}
          classNames={'search'}
          unmountOnExit
        >
          <input className={styles['input-search']}
            type="text"
            placeholder='Искать в медиатеке'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </CSSTransition>
        {search &&
          <span className={styles['clear-search']}
            onClick={() => setSearch('')}
          >
            {<MdClear />}
          </span>}
      </div>
      <SelectSorting />
    </div>
  )
})

export default InputSearch
