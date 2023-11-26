import { Track } from './Track.type'
import { User } from './User.type'

export interface Playlist {
    id: number | null
    name: string
    avatar: string
    public: boolean
    createdAt: string | null
    tracks?: Track[]
    author: Omit<User['user'], 'isActivated' | 'junior'>
    usersPlaylist?: {id: number }[] | undefined
}