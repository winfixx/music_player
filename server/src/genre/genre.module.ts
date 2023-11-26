import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { SequelizeModule } from '@nestjs/sequelize'
import { Genre } from 'src/model/genre.model'
import { TrackGenre } from 'src/model/track_genre.model'
import { UserModule } from 'src/user/user.module'
import { TokenModule } from 'src/token/token.module'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Genre, TrackGenre
    ]),
    UserModule,
    TokenModule
  ],
  providers: [GenreService],
  controllers: [GenreController]
})
export class GenreModule {}
