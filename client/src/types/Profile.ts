import { Album } from './Album.type'
import { Playlist } from './Playlist.type'
import { Track } from './Track.type'
import { User } from './User.type'

export interface Profile {
    id: User['user']['id']
    name: User['user']['name']
    email: User['user']['email']
    avatar: User['user']['avatar']
    albums: Pick<Album, 'id' | 'avatar' | 'name' | 'createdAt'>[]
    playlists: Pick<Playlist, 'id' | 'avatar' | 'name' | 'createdAt' | 'public'>[]
    tracks: Pick<Track, 'id' | 'avatar' | 'name' | 'fileName' | 'createdAt' | 'time'>[]
}