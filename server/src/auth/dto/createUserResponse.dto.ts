import { User } from 'src/user/user.model'

type FieldUser = 'id' | 'name' | 'email' | 'isActivated' | 'avatar' | 'junior'

export class CreateUserResponseDto {
    user: Pick<User, FieldUser>
    token: {
        accessToken: string
        refreshToken?: string
    }

    constructor(
        user: Pick<User, FieldUser>,
        token: {
            accessToken: string
            refreshToken?: string
        }
    ) {
        this.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            isActivated: user.isActivated,
            avatar: user.avatar,
            junior: user.junior
        }
        this.token = token
    }
}