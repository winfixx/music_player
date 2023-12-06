import * as React from 'react'
import { BsPerson } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward, IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE, SERVER_API } from '../../constants/constants'
import { useAppSelector } from '../../hooks/redux'
import { useLocationPath } from '../../hooks/useLocationPath'
import ImageAvatar from '../img/ImageAvatar'
import SearchInput from '../input/search-input/SearchInput'
import styles from './Navbar.module.scss'

interface NavbarProps {
    opacity?: number
}

const Navbar: React.FC<NavbarProps> = ({ opacity }) => {
    const { isAuth, user } = useAppSelector(state => state.userReducer)
    const ref = React.useRef<HTMLInputElement>(null)
    const search = useLocationPath('/search')

    const handleSearch = (dataSearch: string) => {
        console.log(dataSearch)
    }

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

                {search
                    && <div className={styles.search}>
                        <div>
                            <SearchInput ref={ref}
                                handleSearch={handleSearch}
                                placeholder='Что хочешь послушать?'
                            />
                        </div>
                    </div>
                }

                <div className={styles.menu}>
                    <NavLink to=''>{<IoMdNotificationsOutline />}</NavLink>
                    <NavLink className={isAuth ? styles.person : ''}
                        to={isAuth ? '' : `/${LOGIN_ROUTE}`}
                    >
                        {isAuth
                            && <span className={styles.name}>{user.name}</span>
                        }
                        {user.avatar ? <ImageAvatar src={`${SERVER_API}/image/${user.avatar}`}
                            borderRadius='50%'
                            sizeHight='22px'
                            sizeWidth='22px'
                        /> : <BsPerson />}
                    </NavLink>
                </div>
            </div>
        </header >
    )
}

export default Navbar