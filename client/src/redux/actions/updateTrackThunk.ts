import { createAsyncThunk } from '@reduxjs/toolkit'
import trackAxios from '../../api/axios/track.axios'

const updateTrackThunk = createAsyncThunk(
    'users/fetchByIdStatus',
    async (formData: FormData, thunkAPI) => {
        const { data } = await trackAxios.updateInfo(formData)
        return data
    }
)

export default updateTrackThunk