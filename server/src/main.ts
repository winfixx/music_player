import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
    const PORT = 5000
    
    try {
        const app = await NestFactory.create(AppModule)
        await app.listen(PORT, () => console.log(`Started on port = ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
