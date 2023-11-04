import * as React from 'react'
import MusicPlayer from '../music-player/MusicPlayer'
import styles from './Layout.module.scss'
import Filter from './filter/Filter'
import Navigation from './navigation/Navigation'
import SearchLibrary from './searchLibrary/SearchLibrary'
import Setting from './setting/Setting'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = React.memo(({
  children
}) => {
  return (
    <div className={styles.container}>
      <Navigation />

      {children}

      <section className={styles.layout}>
        <div className={styles.library}>

          <Setting />
          <Filter />

          <div className={styles.content}>
            <SearchLibrary />

            <div className={styles.list}>
              {/* list playlist, album, folder */}
            </div>
          </div>

        </div>
      </section>

      <section className={styles.under}>
        <MusicPlayer />
      </section>
    </div>
  )
})

export default Layout
