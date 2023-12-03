import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateGenreDto } from './dto/createGenreDto'
import { GenreService } from './genre.service'

@Controller('genre')
@UseGuards(JwtAuthGuard)
export class GenreController {

    constructor(
        private readonly genreService: GenreService
    ) { }

    @Get()
    public getGenre() {
        const genres = this.genreService.getAllGenre()
        return genres
    }

    @Post()
    public setPreferencesGenre(
        @Body() createGenreDto: CreateGenreDto
    ) {
        const genres = this.genreService.setPreferencesGenre(createGenreDto)
        return genres
    }
}
