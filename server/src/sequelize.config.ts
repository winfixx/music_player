import { ConfigService } from '@nestjs/config'
import { User } from './user/user.model'
import { Token } from './token/token.model'
import { LibraryAlbum } from './model/library_album.model'
import { LibraryPlaylist } from './model/library_playlist.model'
import { Playlist } from './model/playlist.model'
import { LibraryFolder } from './model/library_folder.model'
import { PlaylistTrack } from './model/playlist_track.model'
import { Track } from './model/track.model'
import { TrackGenre } from './model/track_genre.model'
import { Genre } from './model/genre.model'
import { Album } from './model/album.model'
import { Preferences } from './model/preferences.model'

export const getSequelizeConfig = async (
    config: ConfigService
): Promise<any> => {
    const host = config.get<string>('POSTGRES_HOST')
    const port = +config.get<string>('POSTGRES_PORT')
    const username = config.get<string>('POSTGRES_USER')
    const password = config.get<string>('POSTGRES_PASSWORD')
    const database = config.get<string>('POSTGRES_DB')

    return {
        dialect: 'postgres',
        host,
        port,
        username,
        password,
        database,
        models: [
            User,
            Token,
            LibraryAlbum,
            LibraryPlaylist,
            Playlist,
            LibraryFolder,
            PlaylistTrack,
            Track,
            TrackGenre,
            Genre,
            Album,
            Preferences
        ],
        autoLoadModels: true,
        sync: { }
    }
}