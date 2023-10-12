import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
const test2 = 'test2'
@Module({
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule  {
}
const test3 = 'test3'
