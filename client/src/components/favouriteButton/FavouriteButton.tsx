import * as React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { PickIdsPlaylistArgs } from '../../types/PlaylistArgs.type'
import styles from './FavouriteButton.module.scss'

interface IFavouriteButtonProps {
    haveInLibrary: boolean
    author: boolean
    style: React.CSSProperties
    userId: number | null | undefined
    playlistId?: number | string | undefined | null
    trackId?: number | null
    onClickDelete: ((args: PickIdsPlaylistArgs) => Promise<unknown> | void) | undefined
    onClickAdd: ((args: PickIdsPlaylistArgs) => Promise<unknown> | void) | undefined
}

const FavouriteButton: React.FunctionComponent<IFavouriteButtonProps> = ({
    author,
    haveInLibrary,
    style,
    playlistId,
    trackId,
    userId,
    onClickDelete,
    onClickAdd
}) => {
    return (
        <div className={styles.favourites}>
            {!author
                ? haveInLibrary
                    ? <button onClick={() => onClickDelete
                        ? onClickDelete({ userId, playlistId, trackId })
                        : () => { }
                    }
                        style={style}
                        className={`${styles.like} ${styles.haveInLibrary}`}
                    >
                        <FaHeart />
                    </button>
                    : <button onClick={() => onClickAdd
                        ? onClickAdd({ userId, playlistId, trackId })
                        : () => { }
                    }
                        style={style}
                        className={`${styles.like} ${styles.notInLibrary}`}
                    >
                        <FaRegHeart />
                    </button>
                : <></>
            }
        </div>
    )
}

export default FavouriteButton
