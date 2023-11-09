import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TokenModule } from 'src/token/token.module'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/user.model'
import { MailModule } from 'src/mail/mail.module'

@Module({
  imports: [
    SequelizeModule.forFeature([
      User
    ]),
    TokenModule,
    UserModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
