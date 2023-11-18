import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { PlaylistService } from './playlist.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad'

@Controller('playlist')
// @UseGuards(JwtAuthGuard)
export class PlaylistController {

    constructor(
        private readonly playlistService: PlaylistService
    ) { }

    @Post()
    public createPlaylist(
        @Body() { userId }: {userId: number}
    ) {
        const playlist = this.playlistService.createPlaylist(userId)
        return playlist
    }

    @Get('/:playlistId')
    public getOnePlaylist(
        @Param('playlistId') playlistId: string
    ) {
        const playlist = this.playlistService.getOnePlaylist(playlistId)
        return playlist
    }

    @Get('library-playlist')
    public getLibraryPlaylist() {

    }

    @Post('set-library-playlist')
    public setLibraryPlaylist() {

    }
}
