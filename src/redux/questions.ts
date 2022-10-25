import { createSlice } from '@reduxjs/toolkit';
import questions from '../data/questions';

/**
 * Add answer ids for imported questions
 */
const finalQuestions = questions.map(question => {
    const availableAnswers: Answer['id'][] = ['A', 'B', 'C', 'D'];

    question.answers.forEach(answer => {
        const index = Math.floor(Math.random() * availableAnswers.length);
        answer.id = availableAnswers[index];
        availableAnswers.splice(index, 1);
    });
    question.answers.sort((a, b) => a.id > b.id ? 1 : -1);
    
    return question;
});

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

const all: Question[] = finalQuestions;

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
