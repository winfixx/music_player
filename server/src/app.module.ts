import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { Album } from './model/album.model'
import { Genre } from './model/genre.model'
import { LibraryAlbum } from './model/library_album.model'
import { LibraryFolder } from './model/library_folder.model'
import { LibraryPlaylist } from './model/library_playlist.model'
import { Playlist } from './model/playlist.model'
import { PlaylistTrack } from './model/playlist_track.model'
import { Track } from './model/track.model'
import { TrackGenre } from './model/track_genre.model'
import { Token } from './user/token.model'
import { User } from './user/user.model'
import { UserModule } from './user/user.module'
import { Preferences } from './model/preferences.model'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
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
            synchronize: true
            // sync: { alter: true }
        }),
        CloudinaryModule,
        UserModule,
    ],
})
export class AppModule {

}
