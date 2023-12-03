import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.model'
import { Op } from 'sequelize'
import { FilesService } from 'src/files/files.service'
import { Playlist } from 'src/playlist/playlist.model'
import { Album } from 'src/album/album.model'
import { Track } from 'src/model/track.model'

type ExcludePassword = Omit<CreateUserDto, 'password'>

@Injectable()
export class UserService {
    private authorAttributes = ['id', 'name', 'email', 'avatar']

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly filesService: FilesService
    ) { }

    public async createUser(
        createUserDto: CreateUserDto
    ): Promise<User> {
        const user = await this.userRepository.create(createUserDto)
        return user
    }

    public async updateInfo(
        { userId, deleteAvatar, name: newName, avatar }
    ) {
        const user = await this.findUserById(userId)
        if (!user) throw new BadRequestException('Пользователь не найден')

        if (avatar) {
            const newAvatar = this.filesService.createFile(avatar)
            user.avatar = newAvatar
        }

        if (deleteAvatar === 'true') {
            this.filesService.removeFile(user.avatar)
            user.avatar = ''
        }

        user.name = newName.trim()
        await user.save()

        return true
    }

    public async getOneProfile(
        { userId }: { userId: string }
    ) {
        const user = await this.userRepository.findByPk(
            userId,
            {
                include: [
                    {
                        model: Playlist,
                        as: 'playlists',
                        where: {
                            name: {
                                [Op.ne]: 'Любимые треки'
                            }
                        }
                    },
                    {
                        model: Album,
                        as: 'albums'
                    },
                    {
                        model: Track,
                        as: 'tracks'
                    },
                ],
                attributes: this.authorAttributes
            }
        )
        return user
    }

    public async findUserById(
        userId: number | string
    ): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        return user
    }

    public async findUserByEmailAndName(
        { email, name }: ExcludePassword
    ): Promise<User> | null {
        const user = await this.userRepository.findOne({
            where: {
                [Op.and]: {
                    email,
                    name
                }
            }
        })

        return user ? user : null
    }

    public async findUserByEmailOrName(
        { email, name }: ExcludePassword
    ): Promise<User> | null {
        const user = await this.userRepository.findOne({
            where: {
                [Op.or]: {
                    email,
                    name
                }
            }
        })

        return user ? user : null
    }

    public async findUserByActivationLink(
        activationLink: string
    ): Promise<User> | null {
        const user = await this.userRepository.findOne({
            where: {
                activationLink
            }
        })

        return user ? user : null
    }

    public async updateActivationLink(
        activationLink: string,
        { email, name }: ExcludePassword
    ): Promise<User> {
        const user = await this.findUserByEmailAndName({ email, name })

        if (user.isActivated) {
            return null
        }

        return await user.update({ activationLink })
    }
}
