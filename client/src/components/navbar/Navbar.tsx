import * as React from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink, useLocation } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'
import styles from './Navbar.module.scss'
import { LOGIN_ROUTE } from '../../constants/constants'
import { useAppSelector } from '../../hooks/redux'

interface INavbarProps {
    opacity?: number
}

type IHandleScroll = (e: React.UIEvent<HTMLElement>) => void

const Navbar: React.FC<INavbarProps> = ({ opacity }) => {
    const { isAuth } = useAppSelector(state => state.userReducer)
    const location = useLocation()
    const search = location.pathname === '/search'

    return (
        <div className={styles.nav}>
            <header>
                <div style={{ opacity: opacity, transition: 'all .15s' }}
                    className={styles.behind}
                />
                <div className={styles.button}>
                    <button>{<IoIosArrowBack />}</button>
                    <button>{<IoIosArrowForward />}</button>
                </div>
                {search && <div className={styles.search}></div>}
                <div className={styles.menu}>
                    <NavLink to=''>{<IoMdNotificationsOutline />}</NavLink>
                    <NavLink to={isAuth ? '' : LOGIN_ROUTE}>{<BsPerson />}</NavLink>
                </div>
            </header>
        </div>
    )
}

export default Navbar
