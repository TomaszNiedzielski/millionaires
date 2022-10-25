import { Question } from '../redux/questions';

export default [
    {
        id: 1,
        content: 'Jak ma na imię piesek Friza i Wersow?',
        answers: [
            {
                value: 'Chmurka',
                isCorrect: true,
            },
            {
                value: 'Azor',
                isCorrect: false
            },
            {
                value: 'Piesek',
                isCorrect: false
            },
            {
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
                value: 'Różowe',
                isCorrect: true
            },
            {
                value: 'Zielone',
                isCorrect: false,
            },
            {
                value: 'Turkusowe',
                isCorrect: false
            },
            {
                value: 'Lapis Lazuli',
                isCorrect: false
            },
        ]
    },
    {
        id: 3,
        content: 'Kogo oszukała Fagata?',
        answers: [
            {
                value: 'Stuu',
                isCorrect: true
            },
            {
                value: 'Friza',
                isCorrect: false,
            },
            {
                value: 'Murcix',
                isCorrect: false
            },
            {
                value: 'Trombe',
                isCorrect: false
            },
        ]
    },
    {
        id: 4,
        content: 'Jak ma na imię była dziewczyna Krzysztofa Gonciarza, która uciekła z brazylijskim chadem?',
        answers: [
            {
                value: 'Kasia',
                isCorrect: true
            },
            {
                value: 'Basia',
                isCorrect: false,
            },
            {
                value: 'Joasia',
                isCorrect: false
            },
            {
                value: 'Małgosia',
                isCorrect: false
            },
        ]
    },
    {
        id: 5,
        content: 'Kim jest tytułowy "Mleczny Człowiek"?',
        answers: [
            {
                value: 'Krzysztof Kononowicz',
                isCorrect: true
            },
            {
                value: 'Aniela Bogusz',
                isCorrect: false,
            },
            {
                value: 'Wojciech Suchodolski',
                isCorrect: false
            },
            {
                value: 'Bartosz Walaszek',
                isCorrect: false
            },
        ]
    },
    {
        id: 5,
        content: 'Jaki jest ulubiony środek "oburzający" Majora Suchodolskiego?',
        answers: [
            {
                value: 'Rozpuszczalnik Nitro',
                isCorrect: true
            },
            {
                value: 'Żubr',
                isCorrect: false,
            },
            {
                value: 'Papierosy Camele',
                isCorrect: false
            },
            {
                value: 'Olkohol',
                isCorrect: false
            },
        ]
    },
    {
        id: 6,
        content: 'Jaka litera jest odpowiednikiem samogłoski "ą" dla języka bombaskiego?',
        answers: [
            {
                value: 'q',
                isCorrect: true
            },
            {
                value: 'o',
                isCorrect: false,
            },
            {
                value: 'i',
                isCorrect: false
            },
            {
                value: 'ę',
                isCorrect: false
            },
        ]
    },
] as Question[];
