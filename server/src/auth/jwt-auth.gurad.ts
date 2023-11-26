import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { TokenService } from 'src/token/token.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private readonly tokenService: TokenService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>()

            const bearer = request.headers.authorization.split(' ')[0]
            const accessToken = request.headers.authorization.split(' ')[1]
            if (bearer !== 'Bearer' && !accessToken) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }

            const verify = await this.tokenService.verifyAccessToken(accessToken)
            if (verify) {
                return true
            }

            return false
        } catch (error) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        }
    }
}