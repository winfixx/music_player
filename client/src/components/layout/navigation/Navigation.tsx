import * as React from 'react'
import { RiSearch2Line, RiSearch2Fill } from 'react-icons/ri'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import styles from './navigation.module.scss'
import { useLocationPath } from '../../../hooks/useLocationPath'

interface INavigationProps {
}

const Navigation: React.FC<INavigationProps> = React.memo((props) => {
    const searchPath = useLocationPath('/search')

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink
                    className={!searchPath ? `${styles.a} ${styles.active}` : styles.a}
                    to={'/'}
                >
                    <span>{!searchPath ? <GoHomeFill size={25} /> : <GoHome size={25} />}</span> Главная
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={searchPath ? `${styles.a} ${styles.active}` : styles.a}
                    to={'/search'}
                >
                    <span>{searchPath ? <RiSearch2Fill size={25} /> : <RiSearch2Line size={25} />}</span> Поиск
                </NavLink>
            </div>
        </nav>
    )
})

export default Navigation
