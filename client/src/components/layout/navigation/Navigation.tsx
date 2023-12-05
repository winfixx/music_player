import * as React from 'react'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { RiSearch2Fill, RiSearch2Line } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { useLocationPath } from '../../../hooks/useLocationPath'
import styles from './navigation.module.scss'

const Navigation: React.FC = React.memo(() => {
    const searchPath = useLocationPath('/search')
    const homePath = useLocationPath('/')

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink className={homePath ? `${styles.a} ${styles.active}` : styles.a}
                    to={'/'}
                >
                    <span>
                        {homePath ? <GoHomeFill fill={'#fff'} size={25} /> : <GoHome size={25} />}
                    </span>
                    Главная
                </NavLink>
            </div>
            <div>
                <NavLink className={searchPath ? `${styles.a} ${styles.active}` : styles.a}
                    to={'/search'}
                >
                    <span>{searchPath ? <RiSearch2Fill fill={'#fff'} size={25} /> : <RiSearch2Line size={25} />}
                    </span>
                    Поиск
                </NavLink>
            </div>
        </nav>
    )
})

export default Navigation
