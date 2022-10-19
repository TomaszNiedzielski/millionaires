import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questions';
import levelsReduces from './levels';
import lifebuoysReducer from './lifebuoys';

export const store = configureStore({
    reducer: {
        questions: questionsReducer,
        levels: levelsReduces,
        lifebuoys: lifebuoysReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
