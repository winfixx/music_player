import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"
import { UserService } from './user.service'

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post('update-info')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    public updateInfo(
        @Body() { userId, deleteAvatar, name },
        @UploadedFile() avatar,
    ) {
        const user = this.userService.updateInfo({ userId, deleteAvatar, name, avatar })
        return user
    }

    @Get(':userId')
    public getOneProfile(
        @Param('userId') userId: string
    ) {
        const user = this.userService.getOneProfile({userId})
        return user
    }

}
