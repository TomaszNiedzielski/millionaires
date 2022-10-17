import { createSlice } from '@reduxjs/toolkit';

/**
 * 'current' describes current level
 */

const initialState = {
    current: 1,
}

const levelsReducer = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        increaseLevel: (state) => {
            state.current++;
        },
        resetLevels: (state) => {
            state.current = 1;
        }
    }
});

export const { increaseLevel, resetLevels } = levelsReducer.actions;

export default levelsReducer.reducer;
