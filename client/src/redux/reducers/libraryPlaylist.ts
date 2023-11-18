import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
}


const libraryPlaylistSlice = createSlice({
    name: 'libraryPlaylist',
    initialState,
    reducers: {

    }
})

export const {
    actions: libraryPlaylistActions,
    reducer: libraryPlaylistReducer
} = libraryPlaylistSlice