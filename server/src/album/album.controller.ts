import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AlbumService } from './album.service'
import { CreateAlbumArgsDto } from './dto/CreateAlbumArgs.dto'

interface UpdateArgs {
    userId: number
    albumId: number
    avatar: FileList[0] | undefined
    deleteAvatar: string
    name: string
}

@Controller('album')
export class AlbumController {

    constructor(
        private readonly albumService: AlbumService
    ) { }

    @Post()
    public createAlbum(
        @Body() { userId }: { userId: number }
    ) {
        const album = this.albumService.createAlbum(userId)
        return album
    }

    @Post('update-info')
    @UseInterceptors(FileInterceptor('avatar'))
    public updateInfo(
        @Body() createAlbumArgsDto: Omit<CreateAlbumArgsDto, 'avatar'>,
        @UploadedFile() avatar,
    ) {
        const album = this.albumService.updateInfo(createAlbumArgsDto, avatar)
        return album
    }

    @Post('add-track')
    public addTrackInAlbum(
        @Body() { userId, albumId }: CreateAlbumArgsDto
    ) {
        console.log(userId, albumId)
    }

    @Post('add-library')
    public addAlbumInLibrary(
        @Body() { userId, albumId }: Pick<CreateAlbumArgsDto, 'albumId' | 'userId'>
    ) {
        const album = this.albumService.addAlbumInLibrary({ albumId, userId })
        return album
    }

    @Delete('delete-track')
    public deleteTrackFromAlbum() {

    }

    @Delete('delete-album')
    public deleteAlbumFromLibrary(
        @Query('userId') userId: string,
        @Query('albumId') albumId: string
    ) {
        const album = this.albumService.deleteAlbumFromLibrary({ albumId, userId })
        return album
    }

    @Get(':albumId')
    public getOneAlbum(
        @Param('albumId') albumId: string,
        @Query('userId') userId: string
    ) {
        const album = this.albumService.getOneAlbum({ albumId, userId })
        return album
    }

    @Get('library?ds=sd')
    public getAlbumFromLibrary(
        @Param('albumId') albumId: string
    ) {

    }
}
