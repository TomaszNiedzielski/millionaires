import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    audience: {
        isAvailable: true,
        inUse: false,
        isDisabled: false,
    },
    call: {
        isAvailable: true,
        inUse: false,
        isDisabled: false,
    },
    half: {
        isAvailable: true,
        inUse: false,
        isDisabled: false,
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
        resetLifebuoys: () => initialState,
        disableLifebuoys: (state) => {
            state.audience.isDisabled = true;
            state.call.isDisabled = true;
            state.half.isDisabled = true;
        },
        enableLifebuoys: (state) => {
            state.audience.isDisabled = false;
            state.call.isDisabled = false;
            state.half.isDisabled = false;
        }
    }
});

export const { setAudience, setCall, setHalf, removeLifebuoysFromUse, resetLifebuoys, disableLifebuoys, enableLifebuoys } = lifebuoysReducer.actions;

export default lifebuoysReducer.reducer;
