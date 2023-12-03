import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { TrackService } from './track.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('track')
export class TrackController {

    constructor(
        private readonly trackService: TrackService
    ) { }

    @Post('update-info')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    public updateInfo(
        @Body() { trackId, userId, deleteAvatar, name },
        @UploadedFile() avatar,
    ) {
        const user = this.trackService.updateInfo({ trackId, userId, deleteAvatar, name, avatar })
        return user
    }

    @Delete('delete-track')
    public deleteTrackFromAll(
        @Query('trackId') trackId: string,
        @Query('userId') userId: string
    ) {
        const track = this.trackService.deleteTrackFromAll({ trackId, userId })
        return track
    }

    @Get(':trackId')
    public getOneTrack(
        @Param('trackId') trackId: string,
        @Query('userId') userId: string
    ) {
        const track = this.trackService.getOneTrack({ trackId, userId })
        return track
    }
}