import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { libraryApi } from '../../../api/rtk/library.api'
import { ALBUM_ROUTE, PLAYLIST_ROUTE } from '../../../constants/constants'
import { useAppSelector } from '../../../hooks/redux'
import AvatarTitle from '../../avatarTitle/AvatarTitle'
import Filter, { FilterType } from '../filter/Filter'
import SearchLibrary from '../searchLibrary/SearchLibrary'
import Setting from '../setting/Setting'
import styles from './Library.module.scss'

const Library: React.FunctionComponent = () => {
    const { user } = useAppSelector(state => state.userReducer)
    const [type, setType] = React.useState<FilterType>({ title: '', type: undefined })
    const [name, setName] = React.useState<string>('')
    const [searchName, setSearchName] = React.useState('')

    const navigate = useNavigate()

    const { data: dataLibrary } = libraryApi.useGetLibraryQuery({ userId: 5, name: name || searchName, sorting: undefined, type: type.type }, { skip: !user.id })

    return (
        <section className={styles.layout}>
            <Setting />
            <Filter setType={setType}
                type={type}
                titleAlbum={dataLibrary?.albums}
                titlePlaylist={dataLibrary?.playlists}
                name={name}
                setName={setName}
            />

            <div className={styles.content}>
                <SearchLibrary handleSearch={setSearchName} />

                <div className={styles.list}>
                    {dataLibrary?.playlists?.map(({ id, playlist }) => <div key={id}
                        className={styles.list__div}
                        onClick={() => navigate(`/${PLAYLIST_ROUTE}/${playlist.id}`)}
                    >
                        <AvatarTitle avatar={playlist.avatar}
                            nameAuthor={playlist.author.name}
                            name={playlist.name}
                            idAuthor={playlist.author.id}
                            pathToTitle={`/${PLAYLIST_ROUTE}/${playlist.id}`}
                            type='Плейлист'
                        />
                    </div>
                    )}
                    {dataLibrary?.albums?.map(({ id, album }) => <div key={id}
                        className={styles.list__div}
                        onClick={() => navigate(`/${ALBUM_ROUTE}/${album.id}`)}
                    >
                        <AvatarTitle avatar={album.avatar}
                            nameAuthor={album.author.name}
                            name={album.name}
                            idAuthor={album.author.id}
                            pathToTitle={`/${ALBUM_ROUTE}/${album.id}`}
                            type='Альбом'
                        />
                    </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Library
