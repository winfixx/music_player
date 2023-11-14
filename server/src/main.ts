import { NestFactory } from '@nestjs/core'
import { v2 as cloudinary } from 'cloudinary'
import { CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface'
import { Request } from 'express'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function start() {
    const PORT = process.env.PORT || 4000

    try {
        const app = await NestFactory.create<NestExpressApplication>(AppModule)

        app.enableCors({
            origin: process.env.CLIENT_API,
            credentials: true
        })
        app.use(cookieParser())

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        await app.listen(PORT, () => console.log(`Started on port = ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
