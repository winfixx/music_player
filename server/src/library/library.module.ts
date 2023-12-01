import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Album } from 'src/album/album.model'
import { Playlist } from 'src/playlist/playlist.model'
import { LibraryAlbum } from 'src/user/library_album.model'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { LibraryController } from './library.controller'
import { LibraryService } from './library.service'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/user.model'

@Module({
    imports:[
        SequelizeModule.forFeature([
             LibraryPlaylist, LibraryAlbum, User
        ]),
        UserModule
    ],
    providers: [LibraryService],
    controllers: [LibraryController]
})
export class LibraryModule { }
