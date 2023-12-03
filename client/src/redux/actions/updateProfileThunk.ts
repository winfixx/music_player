import { createAsyncThunk } from '@reduxjs/toolkit'
import userAxios from '../../api/axios/user.axios'

const updateProfileThunk = createAsyncThunk(
    'users/fetchByIdStatus',
    async (formData: FormData, thunkAPI) => {
        const { data } = await userAxios.updateInfo(formData)
        return data
    }
)

export default updateProfileThunk