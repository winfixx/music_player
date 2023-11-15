import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/User'

interface UserInitialState extends Pick<User, 'user'> {
    isAuth: boolean
}

const initialState: UserInitialState = {
    user: {
        id: null,
        name: '',
        email: '',
        avatar: '',
        isActivated: false,
        junior: false
    },
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User['user'] | any>) => {
            state.user.id = payload.id
            state.user.email = payload.email
            state.user.avatar = payload.avatar
            state.user.isActivated = payload.isActivated
            state.user.junior = payload.junior
            state.user.name = payload.name
            state.isAuth = !!payload.email
        }
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice