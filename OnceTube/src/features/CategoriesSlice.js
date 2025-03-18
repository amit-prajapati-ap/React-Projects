import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 0
};

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        }
    },
});

export const {setCategory} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
