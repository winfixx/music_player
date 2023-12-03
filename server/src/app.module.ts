import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AlbumModule } from './album/album.module'
import { AuthModule } from './auth/auth.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { FilesModule } from './files/files.module'
import { GenreModule } from './genre/genre.module'
import { LibraryModule } from './library/library.module'
import { MailModule } from './mail/mail.module'
import { PlaylistModule } from './playlist/playlist.module'
import { SearchModule } from './search/search.module'
import { getSequelizeConfig } from './sequelize.config'
import { TokenModule } from './token/token.module'
import { TrackModule } from './track/track.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'static'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: getSequelizeConfig
        }),
        CloudinaryModule,
        UserModule,
        TokenModule,
        AuthModule,
        MailModule,
        PlaylistModule,
        GenreModule,
        AlbumModule,
        FilesModule,
        LibraryModule,
        TrackModule,
        SearchModule,
    ]
})
export class AppModule {

}
