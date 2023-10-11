import * as React from 'react'
import { RiSearch2Line, RiSearch2Fill } from 'react-icons/ri'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './navigation.module.scss'

interface INavigationProps {
}

const Navigation: React.FC<INavigationProps> = React.memo((props) => {
    const location = useLocation()
    const active = location.pathname !== '/search'

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink
                    className={active ? `${styles.a} ${styles.active}` : styles.a}
                    to={'/'}
                >
                    <span>{active ? <GoHomeFill size={25} /> : <GoHome size={25} />}</span> Главная
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={!active ? `${styles.a} ${styles.active}` : styles.a}
                    to={'/search'}
                >
                    <span>{!active ? <RiSearch2Fill size={25} /> : <RiSearch2Line size={25} />}</span> Поиск
                </NavLink>
            </div>
        </nav>
    )
})

export default Navigation
