import { configureStore } from '@reduxjs/toolkit'
import UserAuthSlice from '../features/UserAuthSlice'
import CategoriesSlice from '../features/CategoriesSlice'
import VideosSlice from '../features/VideosSlice'

export const Store = configureStore({
    reducer: {
        userAuth: UserAuthSlice,
        categories: CategoriesSlice,
        videos: VideosSlice
    }
})