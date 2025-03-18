import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: []
};

export const VideosSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload
        }
    },
});

export const {setVideos} = VideosSlice.actions;
export default VideosSlice.reducer;