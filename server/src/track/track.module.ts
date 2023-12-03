import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { FilesModule } from 'src/files/files.module'
import { Track } from 'src/model/track.model'
import { TokenModule } from 'src/token/token.module'
import { TrackController } from './track.controller'
import { TrackService } from './track.service'

@Module({
    imports: [
        SequelizeModule.forFeature([
            Track
        ]),
        FilesModule,
        TokenModule,
    ],
    providers: [TrackService],
    controllers: [TrackController]
})
export class TrackModule { }