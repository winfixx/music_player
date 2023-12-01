import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { ALBUM_ROUTE } from '../../../../constants/constants'

interface IAlbumNameProps {
    nameAlbumTrack: string | undefined
    idAlbum: number | undefined | null
}

const AlbumName: React.FunctionComponent<IAlbumNameProps> = ({
    nameAlbumTrack,
    idAlbum
}) => {
    return <NavLink to={`/${ALBUM_ROUTE}/${idAlbum}`}>{nameAlbumTrack}</NavLink>
}

export default AlbumName
