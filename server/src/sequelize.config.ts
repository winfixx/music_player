import { ConfigService } from '@nestjs/config'
import { Album } from './model/album.model'
import { Genre } from './model/genre.model'
import { Preferences } from './model/preferences.model'
import { Track } from './model/track.model'
import { TrackGenre } from './model/track_genre.model'
import { Playlist } from './playlist/playlist.model'
import { PlaylistTrack } from './playlist/playlist_track.model'
import { Token } from './token/token.model'
import { LibraryAlbum } from './user/library_album.model'
import { LibraryFolder } from './user/library_folder.model'
import { LibraryPlaylist } from './user/library_playlist.model'
import { User } from './user/user.model'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const getSequelizeConfig = async (
    config: ConfigService
): Promise<SequelizeModuleOptions> => {
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
        // autoLoadModels: true,
        // sync: { alter: true },
    }
}