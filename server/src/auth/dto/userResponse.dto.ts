import { User } from 'src/user/user.model'

export class UserResponseDto {
    readonly user: User
    readonly token: {
        readonly accessToken: string
        readonly refreshToken?: string
    }
} 