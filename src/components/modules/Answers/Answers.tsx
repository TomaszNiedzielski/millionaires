import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { increaseLevel, resetLevels } from '../../../redux/levels';
import { Answer } from '../../../redux/questions';
import { timeout } from '../../../utils/timeout';
import AnswersItem, { Mode } from '../AnswersItem/AnswersItem';

interface Props {
    answers: Answer[];
}

const Answers: React.FC<Props> = ({ answers }) => {
    const [selectedAnswerId, setSelectedAnswerId] = useState<Answer['id']>();
    const [selectedAnswerMode, setSelectedAnswerMode] = useState<Mode>();

    const dispatch = useDispatch();

    const handleAnswer = async (answer: Answer) => {
        setSelectedAnswerId(answer.id);
        setSelectedAnswerMode('selected');
        await timeout(1000);

        if (answer.isCorrect) {
            setSelectedAnswerMode('correct');
            await timeout(1000);
            dispatch(increaseLevel());
        } else {
            setSelectedAnswerMode('incorrect');
            await timeout(1000);
            dispatch(resetLevels());
            Alert.alert('Przegrałeś');
        }

        cleanState();
    }

    const cleanState = () => {
        setSelectedAnswerId(undefined);
        setSelectedAnswerMode(undefined);
    }

    return (
        <View>
            {answers.map(answer => (
                <AnswersItem
                    key={answer.id}
                    {...answer}
                    onSelect={() => handleAnswer(answer)}
                    mode={selectedAnswerId
                        ? ((selectedAnswerId === answer.id)
                            ? selectedAnswerMode
                            : ((selectedAnswerMode === 'incorrect' && answer.isCorrect)
                                ? 'correct'
                                : 'disabled'))
                        : undefined}
                />
            ))}
        </View>
    );
}

export default Answers;
