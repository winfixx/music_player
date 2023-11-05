import * as React from 'react'
import ButtonLayout from '../../button/button-layout/ButtonLayout'
import styles from './Filter.module.scss'
import { MdClear } from 'react-icons/md'

interface FilterProps {
}

const filter: Array<string> = [
    'Плейлисты',
    'Альбомы'
]

const artists: Array<string> = [
    'by Spotify',
    'by Cocojambo',
    'by Cocoj',
    'by jambo',
]

const Filter: React.FC<FilterProps> = React.memo(() => {
    const [type, setType] = React.useState('')
    const [artistName, setArtistName] = React.useState('')
    const [artist, setArtist] = React.useState(artists)

    const onSelect = React.useCallback((artistSelected: string) => {
        if (artistName) {
            setArtistName('')
            setArtist(artists)
            return
        }

        setArtist((artists.filter(artistName => artistName === artistSelected)))
        setArtistName(artistSelected)
        return
    }, [artist, artistName])

    return (
        <div className={styles.filter}>
            {type
                ? <div className={styles.list}>
                    <ButtonLayout onClick={() => setType('')}
                        clear={true}
                    >
                        {<MdClear />}
                    </ButtonLayout>
                    <ButtonLayout onClick={() => setType('')}
                        activePlaylist={true}
                    >
                        {type}
                    </ButtonLayout>
                    {artist.map(artistName =>
                        <ButtonLayout key={artistName}
                            onClick={() => onSelect(artistName)}
                            activeTitle={artist.length === 1 ? true : false}
                        >
                            {artistName}
                        </ButtonLayout>
                    )}
                </div>
                : <div className={styles.list}>
                    {filter.map(item =>
                        <ButtonLayout key={item}
                            onClick={() => setType(item)}
                        >
                            {item}
                        </ButtonLayout>
                    )}
                </div>
            }
        </div>
    )
})

export default Filter
