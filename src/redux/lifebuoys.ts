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
            state.call = { ...state.call, inUse: false }
            state.audience = { ...state.audience, ...action.payload }
        },
        setCall: (state, action) => {
            state.audience = { ...state.audience, inUse: false }
            state.call = { ...state.call, ...action.payload }
        },
        setHalf: (state, action) => {
            state.half = { ...state.half, ...action.payload }
        },
        removeLifebuoysFromUse: (state) => {
            state.audience.inUse = false;
            state.call.inUse = false;
            state.half.inUse = false;
        },
        resetLifebuoys: () => initialState
    }
});

export const { setAudience, setCall, setHalf, removeLifebuoysFromUse, resetLifebuoys } = lifebuoysReducer.actions;

export default lifebuoysReducer.reducer;
