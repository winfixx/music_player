import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { userReducer } from './reducers/userSlice'

const rootReducer = combineReducers({
    userReducer,
    [api.reducerPath]: api.reducer
})

const setupStore = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(api.middleware)
    },
})

export default setupStore

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof setupStore.dispatch