import { Injectable } from '@nestjs/common'
import { Playlist } from './playlist.model'
import { InjectModel } from '@nestjs/sequelize'
import { UserService } from 'src/user/user.service'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { User } from 'src/user/user.model'
import { Track } from 'src/model/track.model'
import { PlaylistTrack } from './playlist_track.model'
import { Album } from 'src/model/album.model'
import sequelize from 'sequelize'

@Injectable()
export class PlaylistService {

    constructor(
        @InjectModel(Playlist) private readonly playlistRepository: typeof Playlist,
        @InjectModel(LibraryPlaylist) private readonly libraryPlaylistRepository: typeof LibraryPlaylist,
        @InjectModel(Track) private readonly trackRepository: typeof Track,
        @InjectModel(PlaylistTrack) private readonly playlistTrackRepository: typeof PlaylistTrack,
        @InjectModel(Album) private readonly albumRepository: typeof Album,
        private readonly userService: UserService
    ) {

    }

    public async createPlaylist(
        userId: number
    ): Promise<any> {
        const user = await this.userService.findUserById(userId)
        const playlist = await this.playlistRepository.create({ name: `Мой плейлист №${user.countOwnPlaylist}`, authorId: userId })
        await this.libraryPlaylistRepository.create({ userId, playlistId: playlist.id })

        await user.update({ countOwnPlaylist: user.countOwnPlaylist + 1 })

        return await this.playlistRepository.findByPk(
            playlist.id,
            {
                include:
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'name', 'email', 'avatar']
                }
            })
    }

    public async getOnePlaylist(
        playlistId: string
    ): Promise<any> {
        const playlist = await this.playlistRepository.findOne({
            where: {
                id: playlistId
            },
            include: [
                {
                    model: Track,
                    include: [{
                        model: Album,
                    }],
                    required: false
                }, {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'name', 'email', 'avatar']
                }
            ],
            attributes: {
                exclude: ['authorId', 'updatedAt']
            }
        })

        return playlist
    }
}
