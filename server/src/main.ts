import { NestFactory } from '@nestjs/core'
import { v2 as cloudinary } from 'cloudinary'
import { CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface'
import { Request } from 'express'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

let allowDomain = 'http://localhost:5173'
let corsOptionsDelegate: CorsOptionsDelegate<Request> = function (req, callback) {
    let corsOptions

    if (req.headers.origin === allowDomain) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }

    callback(null, corsOptions)
}

async function start() {
    const PORT = process.env.PORT || 4000

    try {
        const app = await NestFactory.create<NestExpressApplication>(AppModule)

        app.enableCors(corsOptionsDelegate)

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
