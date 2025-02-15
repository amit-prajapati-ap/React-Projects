import { configureStore } from '@reduxjs/toolkit'
import PasteSlice from '../features/PasteSlice'
import UserAuthSlice from '../features/UserAuthSLice'

export const Store = configureStore({
    reducer: {
        pastes: PasteSlice,
        userAuth: UserAuthSlice
    }
})
