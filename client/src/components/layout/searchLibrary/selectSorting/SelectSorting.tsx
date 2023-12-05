import * as React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import styles from './SelectSorting.module.scss'

interface SelectSortingProps {
}

const options = [
  { value: '1', label: 'Недавно прослушано' },
  { value: '2', label: 'Недавно добавленные' },
  { value: '3', label: 'По алфавиту' },
  { value: '4', label: 'По автору' },
]

const SelectSorting: React.FC<SelectSortingProps> = () => {
  const [select] = React.useState(options[0])

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
