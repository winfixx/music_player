import { createAsyncThunk } from '@reduxjs/toolkit'
import playlistAxios from '../../api/axios/playlist.axios'

const updatePlaylistThunk = createAsyncThunk(
    'users/fetchByIdStatus',
    async (formData: FormData, thunkAPI) => {
        const { data } = await playlistAxios.updateInfo(formData)
        return data
    }
)

export default updatePlaylistThunk