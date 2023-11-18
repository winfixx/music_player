import { Playlist } from './Playlist'

export interface LibraryPlaylist {
    id: number | null
    fixed: boolean
    playlist: Playlist
}