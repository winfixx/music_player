import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
const test2 = 'test2'
@Module({
    imports: [UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule  {
}
const test3 = 'test3'
