import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.model'
import { Op } from 'sequelize'

type ExcludePassword = Omit<CreateUserDto, 'password'>

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) { }

    public async createUser(
        createUserDto: CreateUserDto
    ): Promise<User> {
        const user = await this.userRepository.create(createUserDto)
        return user
    }
    public async findUserById(
        userId: number
    ): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        return user
    }


    public async findUserByEmailAndName(
        { email, name }: ExcludePassword
    ): Promise<User> | null {
        const user = await this.userRepository.findOne({
            where: {
                [Op.and]: {
                    email,
                    name
                }
            }
        })

        return user ? user : null
    }

    public async findUserByEmailOrName(
        { email, name }: ExcludePassword
    ): Promise<User> | null {
        const user = await this.userRepository.findOne({
            where: {
                [Op.or]: {
                    email,
                    name
                }
            }
        })

        return user ? user : null
    }

    public async findUserByActivationLink(
        activationLink: string
    ): Promise<User> | null {
        const user = await this.userRepository.findOne({
            where: {
                activationLink
            }
        })

        return user ? user : null
    }

    public async updateActivationLink(
        activationLink: string,
        { email, name }: ExcludePassword
    ): Promise<User> {
        const user = await this.findUserByEmailAndName({ email, name })

        if (user.isActivated) {
            return null
        }

        return await user.update({ activationLink })
    }
}
