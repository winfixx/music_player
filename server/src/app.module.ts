import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { AuthModule } from './auth/auth.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { MailModule } from './mail/mail.module'
import { UserModule } from './user/user.module'
import { getSequelizeConfig } from './sequelize.config'
import { TokenModule } from './token/token.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: getSequelizeConfig
        }),
        CloudinaryModule,
        UserModule,
        TokenModule,
        AuthModule,
        MailModule,
    ],
})
export class AppModule {

}
