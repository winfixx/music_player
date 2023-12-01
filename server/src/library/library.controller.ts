import { Controller, Get, Query } from '@nestjs/common'
import { LibraryService } from './library.service'
import { TypeSearchingInLibrary, TypeSortingInLibrary } from './type/library.type'

@Controller('library')
export class LibraryController {
    
    constructor(
        private readonly libraryService: LibraryService
    ) { }


    @Get('')
    public getLibrary(
        @Query('userId') userId: string,
        @Query('name') name: string,
        @Query('type') type: TypeSearchingInLibrary,
        @Query('sorting') sorting: TypeSortingInLibrary
    ) {
        const library = this.libraryService.getLibrary({ userId, name, type, sorting })
        return library
    }

}
