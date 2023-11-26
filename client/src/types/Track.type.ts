import { Album } from './Album.type'
import { User } from './User.type'

export interface Track {
    id: number | null
    name: string
    fileName: string
    avatar: string
    createdAt: string
    album?: Album
    PlaylistTrack?: {
        createdAt: string
    }
    author: Omit<User['user'], 'isActivated' | 'junior'>
    playlists?: {id: number, name: string}[]
}