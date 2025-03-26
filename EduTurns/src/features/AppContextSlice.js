import { createSlice } from "@reduxjs/toolkit";
import { dummyCourses } from "../assets/assets";

const initialState = {
    appData: {
        allCourses: dummyCourses,
        isEducator: true,
        enrolledCourses: dummyCourses
    }
}

const AppContextSlice = createSlice({
    name: "app",
    initialState: initialState,

    reducers: { 
        setIsEducator: (state, action) => {
            state.appData.isEducator = action.payload
        },
        fetchUserEnrolledCourses: (state, action) => {
            state.appData.enrolledCourses = action.payload
        }
     },
});

export const { setIsEducator, fetchUserEnrolledCourses } = AppContextSlice.actions;

export default AppContextSlice.reducer;
