import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Album } from 'src/album/album.model'
import { FilesService } from 'src/files/files.service'
import { Track } from 'src/model/track.model'
import { Playlist } from 'src/playlist/playlist.model'
import { User } from 'src/user/user.model'

@Injectable()
export class TrackService {
    private authorAttributes = ['id', 'name', 'email', 'avatar']

    constructor(
        @InjectModel(Track) private readonly trackRepository: typeof Track,
        private readonly filesService: FilesService,
    ) { }

    public async updateInfo(
        { trackId, userId, deleteAvatar, name: newName, avatar }
    ) {
        const track = await this.trackRepository.findByPk(trackId)
        if (!track) throw new BadRequestException('Пользователь не найден')

        if (+track.authorId !== +userId) throw new ForbiddenException('Недостаточно прав')

        if (avatar) {
            const newAvatar = this.filesService.createFile(avatar)
            track.avatar = newAvatar
        }

        if (deleteAvatar === 'true') {
            this.filesService.removeFile(track.avatar)
            track.avatar = ''
        }

        track.name = newName.trim()
        await track.save()

        return true
    }

    public async deleteTrackFromAll(
        { trackId, userId }
    ) {
        try {
            const track = await this.trackRepository.findByPk(trackId)
            if (track.authorId !== Number(userId)) {
                throw new ForbiddenException('Недостаточно прав')
            }

            await track.destroy()
            return true
        } catch (error) {
            throw new ForbiddenException('Недостаточно прав')
        }
    }

    public async getOneTrack(
        { userId, trackId }: { userId: string, trackId: string }
    ) {
        const track = await this.trackRepository.findByPk(
            trackId,
            {
                include: [
                    {
                        model: User,
                        attributes: this.authorAttributes
                    },
                    {
                        model: Album
                    },
                    {
                        model: Playlist,
                        where: {
                            authorId: userId,
                            name: 'Любимые треки'
                        },
                        attributes: ['id', 'name'],
                        through: { attributes: [] },
                        required: false
                    }
                ]
            }
        )
        if (!track) throw new BadRequestException('Такого трека не существует')

        return track
    }

}