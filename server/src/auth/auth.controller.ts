import { Body, Controller, Get, Param, Post, Res, Patch } from '@nestjs/common'
import { Response } from 'express'
import { UseGuards } from '@nestjs/common/decorators'
import { refreshToken } from 'src/constant/constant'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { UserResponseDto } from './dto/userResponse.dto'
import { JwtAuthGuard } from './jwt-auth.gurad'

@Controller('auth')
export class AuthController {
    optionsCookie = {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('registration')
    public async registration(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<UserResponseDto> {
        const { user, token } = await this.authService.registration(createUserDto)

        res.cookie(refreshToken, token.refreshToken, this.optionsCookie)
        return {
            user,
            token: {
                accessToken: token.accessToken
            }
        }
    }

    @Post('login')
    public async login(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<UserResponseDto> {
        const { user, token } = await this.authService.login(createUserDto)

        res.cookie(refreshToken, token.refreshToken, this.optionsCookie)
        return {
            user,
            token: {
                accessToken: token.accessToken
            }
        }
    }

    @Get('activate/:activationLink')
    public async activateLink(
        @Param('activationLink') link: string,
        @Res() res: Response
    ) {
        await this.authService.activateLink(link)

        return res.redirect(process.env.CLIENT_API)
    }

    @Patch('send-link')
    @UseGuards(JwtAuthGuard)
    public async sendLink(
        @Body() createUserDto: CreateUserDto
    ) {
        return await this.authService.resendLink(createUserDto)
    }
}
