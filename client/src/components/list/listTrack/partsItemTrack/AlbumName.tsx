import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface IAlbumNameProps {
    nameAlbumTrack: string | undefined
}

const AlbumName: React.FunctionComponent<IAlbumNameProps> = ({
    nameAlbumTrack
}) => {
    return <NavLink to={''}>{nameAlbumTrack}</NavLink>
}

export default AlbumName
