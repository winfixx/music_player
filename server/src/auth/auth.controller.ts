import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { Req, UseGuards } from '@nestjs/common/decorators'
import { Request, Response } from 'express'
import { refreshTokenTitle } from 'src/constant/constant'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { CreateUserResponseDto } from './dto/createUserResponse.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

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
    ): Promise<CreateUserResponseDto> {
        const { user, token } = await this.authService.registration(createUserDto)

        res.cookie(refreshTokenTitle, token.refreshToken, this.optionsCookie)
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
    ): Promise<CreateUserResponseDto> {
        const { user, token } = await this.authService.login(createUserDto)

        res.cookie(refreshTokenTitle, token.refreshToken, this.optionsCookie)
        return {
            user,
            token: {
                accessToken: token.accessToken
            }
        }
    }

    @Post('logout')
    public async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ): Promise<number> {
        const { refreshToken } = req.cookies
        const token = await this.authService.logout(refreshToken)
        res.clearCookie(refreshTokenTitle)

        return token
    }

    @Get('activate/:activationLink')
    public async activateLink(
        @Param('activationLink') link: string,
        @Res() res: Response
    ): Promise<void> {
        await this.authService.activateLink(link)

        return res.redirect(process.env.CLIENT_API)
    }

    @Get('refresh')
    public async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ): Promise<CreateUserResponseDto> {
        const { refreshToken } = req.cookies

        const { user, token } = await this.authService.refresh(refreshToken)

        res.cookie(refreshTokenTitle, token.refreshToken, this.optionsCookie)
        return {
            user,
            token: {
                accessToken: token.accessToken
            }
        }
    }

    @Patch('send-link')
    @UseGuards(JwtAuthGuard)
    public async sendLink(
        @Body() createUserDto: CreateUserDto
    ): Promise<{ message: string }> {
        return await this.authService.resendLink(createUserDto)
    }
}
