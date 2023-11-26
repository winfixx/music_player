import * as React from 'react'
import { Genre } from '../../../types/Genre.type'
import styles from './ItemGenre.module.scss';

interface IItemGenreProps {
    onSetGenres: (genre: Genre) => void
    genre: Genre
}

const ItemGenre: React.FunctionComponent<IItemGenreProps> = ({
    genre,
    onSetGenres
}) => {
    return (
        <div className={styles.div} onClick={() => onSetGenres(genre)}>
            <span>
                {genre.name}
            </span>
        </div>
    )
}

export default ItemGenre
