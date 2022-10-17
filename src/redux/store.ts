import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questions';
import levelsReduces from './levels';

export const store = configureStore({
    reducer: {
        questions: questionsReducer,
        levels: levelsReduces,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
