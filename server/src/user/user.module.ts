import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { FilesModule } from 'src/files/files.module'
import { TokenModule } from 'src/token/token.module'

@Module({
    imports: [
        SequelizeModule.forFeature([
            User
        ]),
        FilesModule,
        TokenModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
