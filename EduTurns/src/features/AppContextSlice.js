import { createSlice } from "@reduxjs/toolkit";
import { dummyCourses } from "../assets/assets";

const initialState = {
    appData: {
        allCourses: dummyCourses,
        isEducator: true
    }
}

const AppContextSlice = createSlice({
    name: "app",
    initialState: initialState,

    reducers: { 
        setIsEducator: (state, action) => {
            state.appData.isEducator = action.payload
        }
     },
});

export const { setIsEducator } = AppContextSlice.actions;

export default AppContextSlice.reducer;
