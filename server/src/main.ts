import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
    const PORT = process.env.PORT || 4000
    
    try {
        const app = await NestFactory.create(AppModule)
        await app.listen(PORT, () => console.log(`Started on port = ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
