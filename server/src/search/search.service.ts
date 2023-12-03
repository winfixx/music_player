import { Injectable } from '@nestjs/common'

@Injectable()
export class SearchService {

    constructor(
        
    ) { }

    public async search(
        { limit, isTrack, isPlaylist, isAlbum, isExecutor, all, name }
    ) {

    }

}
