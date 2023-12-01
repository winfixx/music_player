import { Album } from './Album.type'
import { Playlist } from './Playlist.type'

export interface Library {
    playlists : {
        id: number | null
        fixed: boolean
        playlist: Playlist
    }[],
    albums: {
        id: number | null
        fixed: boolean
        album: Album
    }[]
}