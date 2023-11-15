import * as React from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'
import styles from './Navbar.module.scss'
import { LOGIN_ROUTE } from '../../constants/constants'
import { useAppSelector } from '../../hooks/redux'
import Search from './search/Search'
import { useLocationPath } from '../../hooks/useLocationPath'
import { useActionCreators } from '../../hooks/useActionCreators'
import { userActions } from '../../redux/reducers/userSlice'

interface NavbarProps {
    opacity?: number
}

const Navbar: React.FC<NavbarProps> = ({ opacity }) => {
    const { isAuth, user } = useAppSelector(state => state.userReducer)
    const ref = React.useRef<HTMLInputElement>(null)
    const search = useLocationPath('/search')
    const actions = useActionCreators(userActions)

    React.useEffect(() => {
        ref.current?.focus()
    }, [search])

    return (
        <header className={styles.header}>
            <div>
                <div style={{ opacity: opacity, transition: 'all .15s' }}
                    className={styles.behind}
                />

                <div className={styles.button}>
                    <button>{<IoIosArrowBack />}</button>
                    <button>{<IoIosArrowForward />}</button>
                </div>

                {search && <Search ref={ref} />}

                <div className={styles.menu}>
                    <NavLink to=''>{<IoMdNotificationsOutline />}</NavLink>
                    <NavLink className={isAuth ? styles.person : ''}
                        to={isAuth ? '' : LOGIN_ROUTE}
                    >
                        {isAuth
                            && <span className={styles.name}>{user.name}</span>
                        }
                        {user.avatar ? '' : <BsPerson />}
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Navbar