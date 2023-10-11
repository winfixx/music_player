import * as React from 'react'
import MusicPlayer from '../music-player/MusicPlayer'
import styles from './Layout.module.scss'
import Filter from './filter/Filter'
import Navigation from './navigation/Navigation'
import InputSearch from './input-search/InputSearch'
import Setting from './setting/Setting'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = React.memo(({
  children
}) => {
  return (
    <div className={styles.container}>
      <Navigation />

      {children}

      <div className={styles.layout}>
        <div className={styles.library}>

          <div>
            <Setting />
            <Filter />
          </div>

          <div className={styles.content}>
            <InputSearch />
            <div className={styles.list}>

            </div>
          </div>

        </div>
      </div>
      <div className={styles.last}>
        <MusicPlayer />
      </div>
    </div>
  )
})

export default Layout
