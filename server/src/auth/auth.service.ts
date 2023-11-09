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
import { UserResponseDto } from './dto/userResponse.dto'

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
    ): Promise<UserResponseDto> {
        try {
            const candidate = await this.userService.findUserByEmailAndName({ email, name })
            if (candidate) throw new HttpException(
                { message: `Пользователь с таким email (${email}) или именем (${name}) уже зарегистрирован` },
                HttpStatus.BAD_REQUEST
            )

            const hashPassword = await this.hashPassword(password, 3)
            const activationLink = this.generateActivationLink()

            const user = await this.userService.createUser({ email, name, password: hashPassword })
            await this.userService.updateActivationLink(activationLink, { email, name })

            await this.mailService.sendMail(email, `${this.activationLink}/${activationLink}`)
                .catch(error => console.log(error))

            const { accessToken, refreshToken } = await this.tokenService.createTokens({ email, name, password })

            return {
                user,
                token: {
                    accessToken,
                    refreshToken
                }
            }
        } catch (error) {
            throw new HttpException(
                { message: `Пользователь с таким email (${email}) или именем (${name}) уже зарегистрирован` },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    public async login(
        { email, name, password }: CreateUserDto
    ): Promise<UserResponseDto> {
        const user = await this.validateUser({ email, name, password })
        const { accessToken, refreshToken } = await this.tokenService.createTokens({ email, name, password })

        return {
            user,
            token: {
                accessToken,
                refreshToken
            }
        }
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

            throw new UnauthorizedException({ message: 'Неккоректные email, имя или пароль' })
        } catch (error) {
            throw new UnauthorizedException({ message: 'Неккоректные email, имя или пароль' })
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
