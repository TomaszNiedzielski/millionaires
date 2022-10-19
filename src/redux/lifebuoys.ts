import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    audience: {
        isAvailable: true,
        inUse: false
    },
    call: {
        isAvailable: true,
        inUse: false
    },
    half: {
        isAvailable: true,
        inUse: false
    }
}

const lifebuoysReducer = createSlice({
    name: 'lifebuoys',
    initialState,
    reducers: {
        setAudience: (state, action) => {
            state.audience = { ...state.audience, ...action.payload }
        },
        removeLifebuoysFromUse: (state) => {
            state.audience.inUse = false;
        },
        resetLifebuoys: () => initialState
    }
});

export const { setAudience, removeLifebuoysFromUse, resetLifebuoys } = lifebuoysReducer.actions;

export default lifebuoysReducer.reducer;
