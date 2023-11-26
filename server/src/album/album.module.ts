import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Album } from 'src/album/album.model'
import { AlbumController } from './album.controller'
import { AlbumService } from './album.service'
import { UserModule } from 'src/user/user.module'
import { TokenModule } from 'src/token/token.module'
import { LibraryAlbum } from 'src/user/library_album.model'
import { FilesModule } from 'src/files/files.module'

@Module({
    imports: [
        SequelizeModule.forFeature([
            Album, LibraryAlbum
        ]),
        UserModule,
        TokenModule,
        FilesModule
    ],
    providers: [AlbumService],
    controllers: [AlbumController]
})
export class AlbumModule {}
