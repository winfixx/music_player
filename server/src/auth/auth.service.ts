import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcryptjs'
import { MailService } from 'src/mail/mail.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { v4 } from 'uuid'
import { CreateUserResponseDto } from './dto/createUserResponse.dto'

@Injectable()
export class AuthService {
    activationLink = `${process.env.SERVER_API}/auth/activate`

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService
    ) { }

    public async registration(
        { email, name, password }: CreateUserDto
    ): Promise<CreateUserResponseDto> {
        try {
            const candidate = await this.userService.findUserByEmailOrName({ email, name })
            if (candidate) throw new BadRequestException(
                { message: `Пользователь с таким email (${email}) или именем (${name}) уже зарегистрирован` }
            )

            const hashPassword = await this.hashPassword(password, 3)
            const activationLink = this.generateActivationLink()

            const user = await this.userService.createUser({ email, name, password: hashPassword })
            await this.userService.updateActivationLink(activationLink, { email, name })

            await this.mailService.sendMail(email, `${this.activationLink}/${activationLink}`)
                .catch(error => console.log(error))

            const { accessToken, refreshToken } = await this.tokenService.createTokens({ email, name })
            await this.tokenService.saveRefreshToken(user.id, refreshToken)

            return new CreateUserResponseDto(user, { accessToken, refreshToken })
        } catch (error) {
            throw new BadRequestException(
                { message: `Пользователь с таким email (${email}) или именем (${name}) уже зарегистрирован` }
            )
        }
    }

    public async login(
        { email, name, password }: CreateUserDto
    ): Promise<CreateUserResponseDto> {
        const user = await this.validateUser({ email, name, password })
        const { accessToken, refreshToken } = await this.tokenService.createTokens({ email, name })
        await this.tokenService.saveRefreshToken(user.id, refreshToken)

        return new CreateUserResponseDto(user, { accessToken, refreshToken })
    }

    public async logout(
        refresh: string
    ): Promise<number> {
        const verify = await this.tokenService.verifyRefreshToken(refresh)
        if (!verify) throw new BadRequestException({ message: 'Произошла ошибка...' })


        const hasToken = await this.tokenService.findRefreshToken(refresh)
        if (!hasToken) throw new BadRequestException({ message: 'Произошла ошибка...' })

        return await this.tokenService.removeRefreshToken(hasToken.userId)
    }

    public async activateLink(
        link: string
    ) {
        const user = await this.userService.findUserByActivationLink(link)

        if (user.isActivated) return

        if (user !== null && user.activationLink && user.activationLink === link)
            return user.update({ isActivated: true })

        throw new BadRequestException({ message: 'Неккоректная ссылка' })
    }

    public async refresh(
        refresh: string
    ): Promise<CreateUserResponseDto> {
        try {
            console.log('refresg', refresh)
            if (!refresh) throw new UnauthorizedException({ message: 'Пользователь не авторизован' })

            const token = await this.tokenService.verifyRefreshToken(refresh)
            const tokenFromDb = await this.tokenService.findRefreshToken(refresh)
            if (!token && !tokenFromDb) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }

            const user = await this.userService.findUserByEmailAndName({ email: token.email, name: token.name })
            const { accessToken, refreshToken } = await this.tokenService.createTokens({ email: user.email, name: user.name })
            await this.tokenService.saveRefreshToken(user.id, refreshToken)

            return new CreateUserResponseDto(user, { accessToken, refreshToken })
        } catch (error) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        }
    }

    public async resendLink(
        { email, name }: CreateUserDto
    ): Promise<{ message: string }> {
        const activationLink = this.generateActivationLink()

        const update = await this.userService.updateActivationLink(activationLink, { email, name })

        if (update) {
            return await this.mailService.sendMail(email, `${this.activationLink}/${activationLink}`)
                .then(res => ({ message: 'Отправлено' }))
                .catch(error => ({ message: 'Возникла ошибка. Повторите...' }))
        }

        return { message: 'Аккаунт уже активирован' }
    }

    private async validateUser(
        { email, name, password }: CreateUserDto
    ): Promise<User> {
        try {
            const user = await this.userService.findUserByEmailAndName({ email, name })
            const validatePassword = await this.validatePassword(password, user?.password)

            if (user !== null && validatePassword) {
                return user
            }

            throw new BadRequestException({ message: 'Неккоректные email, имя или пароль' })
        } catch (error) {
            throw new BadRequestException({ message: 'Неккоректные email, имя или пароль' })
        }
    }

    private async hashPassword(
        password: string, salt: number
    ): Promise<string> {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    private async validatePassword(
        password: string, hashPassword: string
    ): Promise<boolean> {
        const validate = await bcrypt.compare(password, hashPassword)
        return validate
    }

    private generateActivationLink(): string {
        return v4()
    }
}
