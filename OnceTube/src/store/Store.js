import { configureStore } from '@reduxjs/toolkit'
import UserAuthSlice from '../features/UserAuthSlice'

export const Store = configureStore({
    reducer: {
        userAuth: UserAuthSlice
    }
})