import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { Token } from 'src/token/token.model'
import { TokenService } from './token.service'

@Module({
    imports: [
        SequelizeModule.forFeature([
            Token
        ]),
        JwtModule.register({})
    ],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {

}
