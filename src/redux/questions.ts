import { createSlice } from '@reduxjs/toolkit';

/**
 * 'all' property includes all existing questions in app
 * 'used' property includes id's of all questions seen by customer
 */

export interface Answer {
    id: 'A' | 'B' | 'C' | 'D';
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    content: string;
    answers: Answer[];
}

const all: Question[] = [
    {
        id: 1,
        content: 'Jak ma na imię piesek Friza i Wersow?',
        answers: [
            {
                id: 'A',
                value: 'Chmurka',
                isCorrect: true,
            },
            {
                id: 'B',
                value: 'Azor',
                isCorrect: false
            },
            {
                id: 'C',
                value: 'Piesek',
                isCorrect: false
            },
            {
                id: 'D',
                value: 'Leszek',
                isCorrect: false
            },
        ]
    },
    {
        id: 2,
        content: 'Jakiego koloru włosy ma Young Leosia?',
        answers: [
            {
                id: 'A',
                value: 'Zielone',
                isCorrect: false,
            },
            {
                id: 'B',
                value: 'Turkusowe',
                isCorrect: false
            },
            {
                id: 'C',
                value: 'Lapis Lazuli',
                isCorrect: false
            },
            {
                id: 'D',
                value: 'Różowe',
                isCorrect: true
            },
        ]
    },
    {
        id: 3,
        content: 'Kogo oszukała Fagata?',
        answers: [
            {
                id: 'A',
                value: 'Friza',
                isCorrect: false,
            },
            {
                id: 'B',
                value: 'Murcix',
                isCorrect: false
            },
            {
                id: 'C',
                value: 'Stuu',
                isCorrect: true
            },
            {
                id: 'D',
                value: 'Trombe',
                isCorrect: false
            },
        ]
    },
];

const used: Question['id'][] = [];

const initialState = {
    all,
    used,
}

const questionsReducer = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setAsUsed: (state, action) => {
            state.used.push(action.payload.id);
        },
        resetUsed: (state) => {
            state.used = [];
        }
    }
});

export const { setAsUsed, resetUsed } = questionsReducer.actions;

export default questionsReducer.reducer;
