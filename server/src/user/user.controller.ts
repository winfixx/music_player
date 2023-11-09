import { Controller, Post, Body } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { User } from './user.model'

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    // @Post('create')
    // public createUser(
    //     @Body() createUser: CreateUserDto
    // ): Promise<User> {
    //     return this.userService.createUser(createUser)
    // }

}
