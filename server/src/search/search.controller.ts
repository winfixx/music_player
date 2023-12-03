import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from './search.service'

@Controller('search')
export class SearchController {

    constructor(
        private readonly searchService: SearchService
    ) { }

    @Get()
    public search(
        @Query('limit') limit: string,
        @Query('isTrack') isTrack: string,
        @Query('isPlaylist') isPlaylist: string,
        @Query('isAlbum') isAlbum: string,
        @Query('isExecutor') isExecutor: string,
        @Query('all') all: string,
        @Query('name') name: string,
    ) {
        const search = this.searchService.search({ limit, isTrack, isPlaylist, isAlbum, isExecutor, all, name })
        return search
    }

}
