import * as React from 'react'
import ButtonLayout from '../../button/button-layout/ButtonLayout'
import styles from './filter.module.scss'
import { MdClear } from 'react-icons/md'

interface IFilterProps {
}

const filter: Array<string> = [
    'Плейлисты',
    'Альбомы'
]

const artists: Array<string> = [
    'by Spotify',
    'by Gay',
    'dfv'
]


const Filter: React.FC<IFilterProps> = React.memo(() => {
    const [type, setType] = React.useState('')
    const [name, setName] = React.useState('')
    const [artist, setArtist] = React.useState(artists)

    const select = React.useCallback((artist: string) => {
        if (name) {
            setName('')
            return setArtist(artists)
        }
        setArtist((artists.filter(item => item === artist)))
        // setArtist()
        return setName(artist)
    }, [artist, name])

    return (
        <div className={styles.filter}>
            {type ?
                <div className={styles['div-active']}>
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
                    {artist.map(item =>
                        <ButtonLayout key={item}
                            onClick={() => select(item)}
                            activeName={artist.length === 1 ? true : false}
                        >
                            {item}
                        </ButtonLayout>
                    )}
                </div> :
                <div className={styles.default}>
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
