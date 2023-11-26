import * as React from 'react'
import styles from './ListGenres.module.scss'
import { Genre } from '../../../types/Genre.type'
import ItemGenre from './ItemGenre'

interface ListGenresProps {
    dataGenres: Genre[] | undefined
    onSetGenres: (genre: Genre) => void
}

const ListGenres: React.FunctionComponent<ListGenresProps> = ({
    dataGenres,
    onSetGenres
}) => {
    return (
        <div className={styles.list__genres}>
            {dataGenres?.map(genre =>
                <ItemGenre key={genre.id}
                    genre={genre}
                    onSetGenres={() => onSetGenres(genre)}
                />
            )}
        </div>
    )
}

export default ListGenres
