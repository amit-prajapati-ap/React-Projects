import { configureStore } from '@reduxjs/toolkit'
import PasteSlice from '../features/PasteSlice'

export const Store = configureStore({
    reducer: PasteSlice
})