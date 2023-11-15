import * as React from 'react'
import { RiSearch2Line, RiSearch2Fill } from 'react-icons/ri'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import styles from './navigation.module.scss'
import { useLocationPath } from '../../../hooks/useLocationPath'

const Navigation: React.FC = React.memo((props) => {
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
