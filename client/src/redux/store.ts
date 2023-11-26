import { AnyAction, Store, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from '../api/rtk/api'
import { libraryPlaylistReducer } from './reducers/libraryPlaylistSlice'
import { modalReducer } from './reducers/modalSlice'
import { userReducer } from './reducers/userSlice'

const rootReducer = combineReducers({
    userReducer,
    libraryPlaylistReducer,
    modalReducer,
    [api.reducerPath]: api.reducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
    dispatch: AppThunkDispatch
}

const setupStore: AppStore = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(api.middleware)
    },
})

export default setupStore