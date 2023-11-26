import * as React from 'react'
import { genreApi } from '../../api/rtk/genre.api'
import { useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import useScroll from '../../hooks/useScroll'
import { modalAction } from '../../redux/reducers/modalSlice'
import { userActions } from '../../redux/reducers/userSlice'
import { Genre } from '../../types/Genre.type'
import Modal from '../modals/defaultModal/Modal'
import WelcomeModal from '../modals/welcomeModal/WelcomeModal'
import MusicPlayer from '../music-player/MusicPlayer'
import Navbar from '../navbar/Navbar'
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
  const [genres, setGenres] = React.useState<Genre[]>([])
  const { isError, errorMessage, isOpen, textButton, titleModal, typeButton, mainText } = useAppSelector(state => state.modalReducer)
  const user = useAppSelector(state => state.userReducer.user)
  const actionsUser = useActionCreators(userActions)
  const actionsModal = useActionCreators(modalAction)
  const { handleScroll, opacity } = useScroll()
  const [setPreferencesGenre] = genreApi.useSetPreferencesGenreMutation()
  const { data: dataGenres } = genreApi.useGetGenreQuery(null, { skip: !user.junior })

  const onSetGenres = (genreInfo: Genre) => {
    if (genres.some(genre => genre.name === genreInfo.name)) return

    setGenres([...genres, { id: genreInfo.id, name: genreInfo.name }])
    return
  }

  const onSubmitPreferences = async () => {
    actionsUser.setUser({ ...user, junior: false })
    await setPreferencesGenre({ genres, userId: user.id })
  }

  return (
    <div className={styles.container}>
      <Navigation />

      {isOpen
        && <Modal error={isError}
          onClickButton={() => actionsModal.onCloseModal(null)}
          onClickClear={() => actionsModal.onCloseModal(null)}
          textButton={textButton}
          titleModal={titleModal}
          typeButton={typeButton}
          errorMessage={errorMessage}
          style={{ zIndex: 4 }}
          children={mainText}
        />
      }

      {user.junior
        && <WelcomeModal dataGenres={dataGenres}
          onSetGenres={onSetGenres}
          onSubmitPreferences={onSubmitPreferences}
        />
      }

      <section onScroll={handleScroll} className={styles.main}>
        <Navbar opacity={opacity} />
        {children}
      </section>

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
