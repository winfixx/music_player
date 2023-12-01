import * as React from 'react'
import { MdClear } from 'react-icons/md'
import { TypeSearchingInLibrary } from '../../../api/rtk/library.api'
import { Library } from '../../../types/LibraryPlaylist.type'
import ButtonLayout from '../../button/button-layout/ButtonLayout'
import styles from './Filter.module.scss'

interface FilterProps {
    titlePlaylist: Library['playlists'] | undefined
    titleAlbum: Library['albums'] | undefined
    type: FilterType
    setType: (args: FilterType) => void
    name: string
    setName: (args: string) => void
}

export interface FilterType {
    title: string
    type: TypeSearchingInLibrary
}

const filterType: Array<FilterType> = [
    { title: 'Плейлисты', type: 'playlist' },
    { title: 'Альбомы', type: 'album' }
]

const Filter: React.FC<FilterProps> = React.memo(({
    titleAlbum,
    titlePlaylist,
    setType,
    type,
    name,
    setName
}) => {
    const [titlePlaylistPreview, setTitlePlaylistPreview] = React.useState(titlePlaylist)
    const [titleAlbumPreview, setTitleAlbumPreview] = React.useState(titleAlbum)

    React.useEffect(() => {
        setTitleAlbumPreview(titleAlbum)
        setTitlePlaylistPreview(titlePlaylist)
    }, [titleAlbum, titlePlaylist])

    const onSelectPlaylist = React.useCallback((namePlaylist: string) => {
        if (name) {
            setName('')
            setTitlePlaylistPreview(titlePlaylist)
            return
        }

        setName(namePlaylist)
        setTitlePlaylistPreview(titlePlaylistPreview?.filter(({ playlist }) => playlist.name === namePlaylist))
        return
    }, [titlePlaylistPreview, name])

    const onSelectAlbum = React.useCallback((nameAlbum: string) => {
        if (name) {
            setName('')
            setTitleAlbumPreview(titleAlbumPreview)
            return
        }

        setName(nameAlbum)
        setTitleAlbumPreview(titleAlbumPreview?.filter(({ album }) => album.name === nameAlbum))
        return
    }, [titleAlbumPreview, name])

    const onSelectType = ({ title, type: typeSelect }: FilterType) => {
        if (type.type) {
            setType({ title: '', type: undefined })
        }

        setType({ title, type: typeSelect })
    }

    return (
        <div className={styles.filter}>
            <div className={styles.list}>
                {type.title
                    ? <>
                        <ButtonLayout onClick={() => onSelectType({ title: '', type: undefined })}
                            clear={true}
                        >
                            {<MdClear />}
                        </ButtonLayout>
                        <ButtonLayout onClick={() => onSelectType({ title: '', type: undefined })}
                            activeType={true}
                        >
                            {type.title}
                        </ButtonLayout>
                        {type.type === 'playlist'
                            ? titlePlaylistPreview?.map(({ id, playlist }) =>
                                <ButtonLayout key={id}
                                    onClick={() => onSelectPlaylist(playlist.name)}
                                    activeTitle={titlePlaylistPreview.length === 1 ? true : false}
                                >
                                    {playlist.name}
                                </ButtonLayout>
                            )
                            : titleAlbumPreview?.map(({ id, album }) =>
                                <ButtonLayout key={id}
                                    onClick={() => onSelectAlbum(album.name)}
                                    activeTitle={titleAlbumPreview.length === 1 ? true : false}
                                >
                                    {album.name}
                                </ButtonLayout>
                            )
                        }
                    </>
                    : filterType.map(({ title, type }) =>
                        <ButtonLayout key={type}
                            onClick={() => onSelectType({ title, type })}
                        >
                            {title}
                        </ButtonLayout>
                    )
                }
            </div>
        </div>
    )
})

export default Filter
