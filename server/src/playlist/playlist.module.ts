import { Module } from '@nestjs/common'
import { PlaylistController } from './playlist.controller'
import { PlaylistService } from './playlist.service'
import { Playlist } from './playlist.model'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { PlaylistTrack } from './playlist_track.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModule } from 'src/user/user.module'
import { Track } from 'src/model/track.model'
import { Album } from 'src/model/album.model'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/user/user.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Playlist, LibraryPlaylist, PlaylistTrack, Track, Album
    ]),
    UserModule,
    TokenModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule { }
