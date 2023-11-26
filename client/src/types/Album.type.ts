import { Track } from './Track.type'
import { User } from './User.type'

export interface Album {
    id: number | null
    name: string
    avatar: string
    createdAt: string
    author: Omit<User['user'], 'isActivated' | 'junior'>
    tracks: Track[]
    usersLibrary?: { id: number }[] | undefined
}