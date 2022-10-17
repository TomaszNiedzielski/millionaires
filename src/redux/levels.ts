import { createSlice } from '@reduxjs/toolkit';

/**
 * 'current' describes current level
 */

const initialState = {
    current: 0,
    all: [
        {
            id: 1,
            prize: '$500'
        },
        {
            id: 2,
            prize: '$1000'
        },
        {
            id: 3,
            prize: '$2000'
        },
        {
            id: 4,
            prize: '$5000'
        },
        {
            id: 5,
            prize: '$10 000'
        },
        {
            id: 6,
            prize: '$20 000'
        },
        {
            id: 7,
            prize: '$40 000'
        },
        {
            id: 8,
            prize: '$75 000'
        },
        {
            id: 9,
            prize: '$125 000'
        },
        {
            id: 10,
            prize: '$250 000'
        },
        {
            id: 11,
            prize: '$500 000'
        },
        {
            id: 12,
            prize: '$1000 000'
        },
    ]
}

const levelsReducer = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        increaseLevel: (state) => {
            state.current++;
        },
        resetLevels: (state) => {
            state.current = 0;
        }
    }
});

export const { increaseLevel, resetLevels } = levelsReducer.actions;

export default levelsReducer.reducer;
