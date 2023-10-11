import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'

const reducers = {
    userReducer,
}

const rootReducer = combineReducers({
    ...reducers
})

const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    })

export default setupStore
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
