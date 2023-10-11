import * as React from 'react'
import styles from './Search.module.scss'
import Navbar from '../../components/navbar/Navbar'

interface ISearchProps {
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <Navbar />
      </div>
    </div>
  )
}

export default Search
