import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Answers from '../Answers/Answers';
import { Styles } from '../../../constants/styles';
import { resetExcludedAnswers, Question as QuestionProps, resetUsed, setAsUsed } from '../../../redux/questions';
import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { removeLifebuoysFromUse } from '../../../redux/lifebuoys';

const Question: React.FC = () => {
    const { levels, questions, lifebuoys } = useSelector((state: RootState) => state);
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
        dispatch(resetExcludedAnswers());
        const question = getRandomQuestion();

        dispatch(setAsUsed({ id: question.id }));
        dispatch(removeLifebuoysFromUse())
        setQuestion(question);
    }, [levels.current, levels.losses]);

    useEffect(() => {
        if (lifebuoys.half.inUse) {
            const updatedQuestion = questions.all.find((item) => item.id === question?.id);
            setQuestion(updatedQuestion);
        }
    }, [lifebuoys.half.inUse]);

    if (question) {
        return (
            <View style={styles.container}>
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
    container: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        justifyContent: 'flex-end',
        height: Dimensions.get('window').height * 50 / 100,
        width: Dimensions.get('window').width + 4,
        shadowColor: '#fff',
        elevation: 2,
        borderTopWidth: .1,
        borderTopColor: '#fff',
        alignSelf: 'center',
    },
    question: {
        fontSize: 22,
        ...Styles.whiteText,
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default Question;
