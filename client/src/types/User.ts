export interface User {
    user: {
        id: number | null
        name: string
        email: string
        avatar: string
        isActivated?: boolean
        junior?: boolean
    }
    token?: {
        accessToken: string
    }
}
