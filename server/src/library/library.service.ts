import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Album } from 'src/album/album.model'
import { Playlist } from 'src/playlist/playlist.model'
import { LibraryAlbum } from 'src/user/library_album.model'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { TypeSearchingInLibrary, TypeSortingInLibrary } from './type/library.type'

@Injectable()
export class LibraryService {
    private userAttributes = ['id', 'name', 'email', 'avatar']

    constructor(
        @InjectModel(LibraryPlaylist) private readonly libraryPlaylistRepository: typeof LibraryPlaylist,
        @InjectModel(LibraryAlbum) private readonly libraryAlbumRepository: typeof LibraryAlbum,
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly userService: UserService
    ) {

    }

    public async getLibrary(
        { userId, name, type, sorting }: { userId: string, name: string, type: TypeSearchingInLibrary, sorting: TypeSortingInLibrary }
    ) {
        const user = this.userService.findUserById(userId)
        if (!user) throw new UnauthorizedException('Пользователь не авторизован')

        const playlists = await this.libraryPlaylistRepository.findAll({
            where: {
                userId
            },
            include: {
                model: Playlist,
                where: {
                    name: { [Op.iLike]: name ? `%${name}%` : '%%' }
                },
                required: true,
                order: [
                    sorting === 'По алфавиту' ? ['name', 'ASC'] : ['name', 'DESC']
                ],
                include: [{
                    model: User,
                    as: 'author',
                    attributes: this.userAttributes
                }]
            },
            order: [
                sorting === 'Недавно добавленные' ? ['createdAt', 'ASC'] : ['createdAt', 'DESC'],
            ]
        })

        const albums = await this.libraryAlbumRepository.findAll({
            where: {
                userId
            },
            include: {
                model: Album,
                where: {
                    name: { [Op.iLike]: name ? `%${name}%` : '%%' }
                },
                required: true,
                order: [
                    sorting === 'По алфавиту' ? ['name', 'ASC'] : ['name', 'DESC']
                ],
                include: [{
                    model: User,
                    as: 'author',
                    attributes: this.userAttributes
                }]
            },
            order: [
                sorting === 'Недавно добавленные' ? ['createdAt', 'ASC'] : ['createdAt', 'DESC']
            ]
        })

        if (type === 'playlist') {
            return { playlists }
        }
        if (type === 'album') {
            return { albums }
        }

        return {
            playlists,
            albums
        }
    }

}
