import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { Token } from 'src/token/token.model'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

@Injectable()
export class TokenService {

    constructor(
        @InjectModel(Token) private readonly tokenRepository: typeof Token,
        private readonly jwtService: JwtService
    ) { }

    public async createTokens(
        payload: Pick<CreateUserDto, 'name' | 'email'>
    ) {
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m', secret: process.env.ACCESS_TOKEN_SECRET })
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '30d', secret: process.env.REFRESH_TOKEN_SECRET })

        return {
            accessToken,
            refreshToken
        }
    }

    public async verifyAccessToken(
        accessToken: string
    ): Promise<Pick<CreateUserDto, 'name' | 'email'>> | null {
        const verify = await this.jwtService.verifyAsync<CreateUserDto>(accessToken, { secret: process.env.ACCESS_TOKEN_SECRET })
        if (verify) return verify

        return null
    }

    public async verifyRefreshToken(
        refreshToken: string
    ): Promise<Pick<CreateUserDto, 'name' | 'email'>> | null {
        const verify = await this.jwtService.verifyAsync<CreateUserDto>(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET })
        if (verify) return verify

        return null
    }


    public async saveRefreshToken(
        userId: number,
        refreshToken: string
    ): Promise<Token> {
        try {
            const isHaveToken = await this.tokenRepository.findOne({ where: { userId } })

            if (isHaveToken) {
                return await isHaveToken.update({ refreshToken, userId })
            }

            const token = await this.tokenRepository.create({ refreshToken, userId })
            return token
        } catch (error) {
            console.log(error)
        }
    }

    public async removeRefreshToken(
        userId: number
    ): Promise<number> {
        const token = await this.tokenRepository.destroy({ where: { userId } })
        return token
    }

    public async findRefreshToken(
        refreshToken: string
    ): Promise<Token> {
        const token = await this.tokenRepository.findOne({ where: { refreshToken } })
        return token
    }
}
