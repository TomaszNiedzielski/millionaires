import { createSlice } from '@reduxjs/toolkit';

/**
 * 'all' property includes all existing questions in app
 * 'used' property includes id's of all questions seen by customer
 */

export interface Answer {
    id: 'A' | 'B' | 'C' | 'D';
    value: string;
    isCorrect: boolean;
    isExcluded?: boolean;
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
        },
        excludeTwoAnswers: (state) => {
            const currentQuestionId = state.used[state.used.length - 1];
            const currentQuestionIndex = state.all.findIndex(({ id }) => id === currentQuestionId);
            const allAnswers = state.all[currentQuestionIndex].answers;

            const correctAnswerIndex = allAnswers.findIndex(({ isCorrect }) => isCorrect);
            let incorrectAnswerIndexes = [0, 1, 2, 3].filter(value => value !== correctAnswerIndex);

            /**
             * This function will find two random numbers as indexes of 'incorrectAnswerIndexes' array.
             */
            const answersToExclude: number[] = [];
            const getTwoRandomIndexOfIncorrectAnswerIndexes = () => {
                const i = Math.floor(Math.random() * incorrectAnswerIndexes.length);

                if (!answersToExclude.includes(incorrectAnswerIndexes[i])) {
                    answersToExclude.push(incorrectAnswerIndexes[i]);
                }

                if (answersToExclude.length < 2) {
                    getTwoRandomIndexOfIncorrectAnswerIndexes();
                }
            }

            getTwoRandomIndexOfIncorrectAnswerIndexes();

            allAnswers[answersToExclude[0]].isExcluded = true;
            allAnswers[answersToExclude[1]].isExcluded = true;
        },
        resetExcludedAnswers: (state) => {
            const currentQuestionId = state.used[state.used.length - 1];
            const currentQuestionIndex = state.all.findIndex(({ id }) => id === currentQuestionId);
            state.all[currentQuestionIndex]?.answers.forEach(answer => {
                delete(answer.isExcluded);
            });
        }
    }
});

export const { setAsUsed, resetUsed, excludeTwoAnswers, resetExcludedAnswers } = questionsReducer.actions;

export default questionsReducer.reducer;
