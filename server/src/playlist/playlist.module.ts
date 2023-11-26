import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Album } from 'src/album/album.model'
import { FilesModule } from 'src/files/files.module'
import { Track } from 'src/model/track.model'
import { TokenModule } from 'src/token/token.module'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { UserModule } from 'src/user/user.module'
import { PlaylistController } from './playlist.controller'
import { Playlist } from './playlist.model'
import { PlaylistService } from './playlist.service'
import { PlaylistTrack } from './playlist_track.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Playlist, LibraryPlaylist, PlaylistTrack, Track, Album
    ]),
    UserModule,
    TokenModule,
    FilesModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule { }
