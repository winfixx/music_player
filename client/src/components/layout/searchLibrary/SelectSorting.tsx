import * as React from 'react'
import styles from './SelectSorting.module.scss'
import { IoMdArrowDropdown } from 'react-icons/io'

interface SelectSortingProps {
}

const options = [
  { value: '1', label: 'Недавно прослушано' },
  { value: '2', label: 'Недавно добавленные' },
  { value: '3', label: 'По алфавиту' },
  { value: '4', label: 'По автору' },
]

const SelectSorting: React.FC<SelectSortingProps> = (props) => {
  const [select, setSelect] = React.useState(options[0])

  return (
    <div className={styles.select}>
      <span onClick={() => console.log(1)}>
        <button>{select.label}</button>
        <IoMdArrowDropdown />
      </span>
    </div>
  )
}

export default SelectSorting
