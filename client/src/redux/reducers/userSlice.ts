import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/User'

const initialState: User = {
    isAuth: false,
    email: '',
    name: '',
    password: ''
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export default UserSlice.reducer