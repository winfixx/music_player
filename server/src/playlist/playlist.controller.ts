import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PlaylistService } from './playlist.service'
import { CreatePlaylistArgsDto } from './dto/CreatePlaylistArgs.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad'

@Controller('playlist')
// @UseGuards(JwtAuthGuard)
export class PlaylistController {

    constructor(
        private readonly playlistService: PlaylistService
    ) { }

    @Post()
    public createPlaylist(
        @Body() { userId }: { userId: number }
    ) {
        const playlist = this.playlistService.createPlaylist(userId)
        return playlist
    }

    @Post('update-info')
    @UseInterceptors(FileInterceptor('avatar'))
    public updateInfo(
        @Body() { playlistId, userId, deleteAvatar, name }: Omit<CreatePlaylistArgsDto, 'avatar'>,
        @UploadedFile() avatar,
    ) {

        const playlist = this.playlistService.updateInfo({ playlistId, userId, deleteAvatar, name, avatar })
        return playlist
    }

    @Post('add-track')
    public addTrackInPlaylist(
        @Body() createPlaylistDto: Pick<CreatePlaylistArgsDto, 'userId' | 'trackId' | 'playlistId'>
    ) {
        const track = this.playlistService.addTrackInPlaylist(createPlaylistDto)
        return track
    }

    @Post('add-library')
    public addPlaylistInLibrary(
        @Body() { playlistId, userId }: Pick<CreatePlaylistArgsDto, 'playlistId' | 'userId'>
    ) {
        const playlist = this.playlistService.addPlaylistInLibrary({ playlistId, userId })
        return playlist
    }

    @Delete('delete-track')
    public deleteTrackFromPlaylist(
        @Query('userId') userId: string,
        @Query('playlistId') playlistId: string,
        @Query('trackId') trackId: string
    ) {
        const track = this.playlistService.deleteTrackFromPlaylist({ playlistId, userId, trackId })
        return track
    }

    @Delete('delete-playlist')
    public deletePlaylistFromLibrary(
        @Query('userId') userId: string,
        @Query('playlistId') playlistId: string
    ) {
        const playlist = this.playlistService.deletePlaylistFromLibrary({ playlistId, userId })
        return playlist
    }

    @Get('/:playlistId')
    public getOnePlaylist(
        @Param('playlistId') playlistId: string,
        @Query('userId') userId: string
    ) {
        const playlist = this.playlistService.getOnePlaylist({ playlistId, userId })
        return playlist
    }

    @Get('library?ds=sd')
    public getPlaylistsFromLibrary() {

    }
}
