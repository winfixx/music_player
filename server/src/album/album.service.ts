import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Album } from 'src/album/album.model'
import { FilesService } from 'src/files/files.service'
import { Track } from 'src/model/track.model'
import { LibraryAlbum } from 'src/user/library_album.model'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { CreateAlbumArgsDto } from './dto/CreateAlbumArgs.dto'
import { Playlist } from 'src/playlist/playlist.model'

@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album) private readonly albumRepository: typeof Album,
        @InjectModel(LibraryAlbum) private readonly libraryAlbumRepository: typeof LibraryAlbum,
        private readonly userService: UserService,
        private readonly filesService: FilesService

    ) {

    }

    public async createAlbum(
        userId: number
    ) {
        const user = await this.userService.findUserById(userId)
        if (!user) throw new UnauthorizedException('Зарегистрируйтесь')

        const album = await this.albumRepository.create({ name: `Мой альбом №${user.countOwnAlbum}`, authorId: userId })
        await this.libraryAlbumRepository.create({ userId, albumId: album.id })

        await user.update({ countOwnAlbum: user.countOwnAlbum + 1 })

        return { id: album.id }
    }

    public async updateInfo(
        { albumId, userId, deleteAvatar, name: newName }: Omit<CreateAlbumArgsDto, 'avatar'>,
        avatar?: File
    ) {
        const album = await this.albumRepository.findOne({
            where: {
                id: albumId,
                authorId: userId
            }
        })
        if (!album) throw new BadRequestException({ message: 'Альбом не найден' })

        if (avatar) {
            const newAvatar = this.filesService.createFile(avatar)
            album.avatar = newAvatar
        }

        if (deleteAvatar === 'true') {
            this.filesService.removeFile(album.avatar)
            album.avatar = ''
        }

        album.name = newName.trim()
        await album.save()

        return true
    }

    public async addTrackInAlbum() {

    }

    public async addAlbumInLibrary(
        { albumId, userId }: Pick<CreateAlbumArgsDto, 'albumId' | 'userId'>
    ) {
        try {
            await this.libraryAlbumRepository.findOrCreate({ where: { albumId, userId } })
        } catch (error) {
            throw new InternalServerErrorException('Не удалось добавить альбом в медиатеку')
        }
    }

    public async deleteTrackFromAlbum() {

    }

    public async deleteAlbumFromLibrary(
        { albumId, userId }: Pick<CreateAlbumArgsDto, 'albumId' | 'userId'>
    ) {
        try {
            await this.libraryAlbumRepository.destroy({ where: { albumId, userId } })
            return true
        } catch (error) {
            throw new InternalServerErrorException('Не удалось удалить альбом из медиатеки')
        }
    }

    public async getOneAlbum(
        { albumId, userId }: Pick<CreateAlbumArgsDto, 'albumId' | 'userId'>
    ) {
        const album = await this.albumRepository.findByPk(
            albumId,
            {
                attributes: {
                    exclude: ['updatedAt', 'authorId']
                },
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'name', 'email', 'avatar']
                    },
                    {
                        model: Track,
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'name', 'email', 'avatar']
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
                        }
                    },
                    {
                        model: User,
                        as: 'usersLibrary',
                        attributes: ['id'],
                        through: {
                            attributes: []
                        },
                        where: {
                            id: userId
                        },
                        required: false
                    }
                ]
            }
        )
        if (!album) throw new BadRequestException('Такого альбома не существует')

        return album
    }

    public async getAlbumFromLibrary() {

    }
}
