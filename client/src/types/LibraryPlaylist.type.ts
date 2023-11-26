import { Playlist } from './Playlist.type'

export interface LibraryPlaylist {
    id: number | null
    fixed: boolean
    playlist: Playlist
}