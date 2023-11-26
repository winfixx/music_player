import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Genre } from 'src/model/genre.model'
import { TrackGenre } from 'src/model/track_genre.model'
import { CreateGenreDto } from './dto/createGenreDto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GenreService {

    constructor(
        @InjectModel(Genre) private readonly genreRepository: typeof Genre,
        @InjectModel(TrackGenre) private readonly trackGenreRepository: typeof TrackGenre,
        private readonly userService: UserService
    ) { }

    public async getAllGenre(): Promise<Pick<Genre, 'id' | 'name'>[]> {
        const genres = await this.genreRepository.findAll({
            attributes: ['id', 'name']
        })
        return genres
    }

    public async setPreferencesGenre(
        createGenreDto: CreateGenreDto
    ): Promise<boolean> {
        const user = await this.userService.findUserById(createGenreDto.userId)
        await user.update({ junior: false })

        createGenreDto.genres.forEach(async genre => await user.$add('genres', [genre.id]))
        return true
    }
}