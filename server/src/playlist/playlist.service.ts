import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Album } from 'src/album/album.model'
import { FilesService } from 'src/files/files.service'
import { Track } from 'src/model/track.model'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { CreatePlaylistArgsDto } from './dto/CreatePlaylistArgs.dto'
import { Playlist } from './playlist.model'
import { PlaylistTrack } from './playlist_track.model'

@Injectable()
export class PlaylistService {
    private authorAttributes = ['id', 'name', 'email', 'avatar']
    private nameFavouritePlaylist = 'Любимые треки'

    constructor(
        @InjectModel(Playlist) private readonly playlistRepository: typeof Playlist,
        @InjectModel(LibraryPlaylist) private readonly libraryPlaylistRepository: typeof LibraryPlaylist,
        @InjectModel(Track) private readonly trackRepository: typeof Track,
        @InjectModel(PlaylistTrack) private readonly playlistTrackRepository: typeof PlaylistTrack,
        private readonly userService: UserService,
        private readonly filesService: FilesService
    ) {

    }

    public async createPlaylist(
        userId: number
    ): Promise<any> {
        const user = await this.userService.findUserById(userId)
        if (!user) throw new UnauthorizedException('Зарегистрируйтесь')

        const playlist = await this.playlistRepository.create({ name: `Мой плейлист №${user.countOwnPlaylist}`, authorId: userId })
        await this.addPlaylistInLibrary({ userId: user.id, playlistId: playlist.id })

        await user.update({ countOwnPlaylist: user.countOwnPlaylist + 1 })

        return { id: playlist.id }
    }

    public async updateInfo(
        { playlistId, userId, deleteAvatar, name: newName, avatar }: CreatePlaylistArgsDto
    ) {
        const playlist = await this.playlistRepository.findOne({
            where: {
                id: playlistId,
                authorId: userId
            }
        })

        if (!playlist) throw new BadRequestException('Плейлист не найден')

        if (avatar) {
            const newAvatar = this.filesService.createFile(avatar)
            playlist.avatar = newAvatar
        }

        if (deleteAvatar === 'true') {
            this.filesService.removeFile(playlist.avatar)
            playlist.avatar = ''
        }

        playlist.name = newName.trim()
        await playlist.save()

        return true
    }

    public async addTrackInPlaylist(
        { trackId, playlistId, userId }: Pick<CreatePlaylistArgsDto, 'userId' | 'trackId' | 'playlistId'>
    ) {
        console.log(trackId, playlistId, userId)
        const user = await this.userService.findUserById(userId)
        if (!user) throw new UnauthorizedException('Зарегистрируйтесь')

        if (!playlistId) {
            const favoriteTracks = await this.playlistRepository.findOrCreate({ where: { name: this.nameFavouritePlaylist, authorId: userId } })
            await this.playlistTrackRepository.create({ trackId: +trackId, playlistId: favoriteTracks[0].id })
            return true
        }

        const playlist = await this.playlistRepository.findByPk(playlistId)
        if (!playlist) throw new BadRequestException('Такого плейлиста не существует')
        await this.playlistTrackRepository.create({ trackId: +trackId, playlistId: playlist.id })
        return true
    }

    public async addPlaylistInLibrary(
        { userId, playlistId }: Record<keyof Pick<CreatePlaylistArgsDto, 'userId' | 'playlistId'>, string | number>
    ) {
        try {
            await this.libraryPlaylistRepository.findOrCreate({ where: { userId, playlistId } })
            return true
        } catch (error) {
            throw new InternalServerErrorException('Не удалось добавить плейлист в медиатеку')
        }
    }

    public async deleteTrackFromPlaylist(
        { trackId, playlistId, userId }: Pick<CreatePlaylistArgsDto, 'userId' | 'trackId' | 'playlistId'>
    ) {
        if (playlistId === 'undefined' || playlistId === 'null') {
            const playlist = await this.playlistRepository.findOne({
                where: {
                    authorId: userId,
                    name: this.nameFavouritePlaylist
                }
            })

            await this.playlistTrackRepository.destroy({
                where: { playlistId: playlist.id, trackId }
            })

            return true
        }
        return true
    }

    public async deletePlaylistFromLibrary(
        { playlistId, userId }: Pick<CreatePlaylistArgsDto, 'playlistId' | 'userId'>
    ) {
        try {
            await this.libraryPlaylistRepository.destroy({ where: { playlistId, userId } })
            return true
        } catch (error) {
            throw new InternalServerErrorException('Не удалось удалить плейлист из медиатеки')
        }
    }

    public async getOnePlaylist(
        { playlistId, userId }: Pick<CreatePlaylistArgsDto, 'playlistId' | 'userId'>
    ): Promise<any> {
        const playlist = await this.playlistRepository.findByPk(
            playlistId,
            {
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: this.authorAttributes
                    },
                    {
                        model: Track,
                        include: [
                            {
                                model: Album,
                                attributes: {
                                    exclude: ['updatedAt', 'authorId']
                                }
                            },
                            {
                                model: User,
                                attributes: this.authorAttributes
                            },
                            {
                                model: Playlist,
                                where: {
                                    authorId: userId,
                                    name: 'Любимые треки'
                                },
                                required: false,
                                attributes: ['id', 'name'],
                                through: {
                                    attributes: []
                                }
                            }
                        ],
                        attributes: {
                            exclude: ['updatedAt', 'albumId', 'authorId']
                        },
                        through: {
                            attributes: ['createdAt']
                        },
                        required: false
                    },
                    {
                        model: User,
                        as: 'usersPlaylist',
                        attributes: ['id'],
                        through: {
                            attributes: []
                        },
                        where: {
                            id: userId
                        },
                        required: false
                    }
                ],
                attributes: {
                    exclude: ['authorId', 'updatedAt']
                },

            }
        )
        if (!playlist) throw new BadRequestException('Такого плейлиста не существует')

        return playlist
    }

    public async getPlaylistsFromLibrary() {

    }
}
