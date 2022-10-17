import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Answers from '../Answers/Answers';
import { Styles } from '../../../constants/styles';
import { Question as QuestionProps, resetUsed, setAsUsed } from '../../../redux/questions';
import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';

const Question: React.FC = () => {
    const { levels, questions } = useSelector((state: RootState) => state);
    const [question, setQuestion] = useState<QuestionProps>();
    const dispatch = useDispatch();

    const getRandomQuestion = () => {
        const { all, used } = questions;
        const availableQuestions = all.filter(({ id }) => !used.includes(id));

        if (availableQuestions.length === 1) {
            dispatch(resetUsed());
        }

        const randomIndex = Math.floor(Math.random() * (availableQuestions.length) + 0);
        return availableQuestions[randomIndex];
    }

    useEffect(() => {
        const question = getRandomQuestion();

        dispatch(setAsUsed({ id: question.id }));
        setQuestion(question);
    }, [levels.current]);

    if (question) {
        return (
            <View>
                <Text style={styles.question} accessibilityRole="text">{question.content}</Text>
                <Answers
                    answers={question.answers}
                />
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    question: {
        fontSize: 22,
        fontWeight: '500',
        ...Styles.whiteText,
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default Question;