import { createAsyncThunk } from '@reduxjs/toolkit'
import albumAxios from '../../api/axios/album.axios'

const updateAlbumThunk = createAsyncThunk(
    'users/fetchByIdStatus',
    async (formData: FormData, thunkAPI) => {
        const { data } = await albumAxios.updateInfo(formData)
        return data
    }
)

export default updateAlbumThunk