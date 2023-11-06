import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        CloudinaryModule,
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule {

}
