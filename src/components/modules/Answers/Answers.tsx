import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increaseLevel, increaseLosses } from '../../../redux/levels';
import { disableLifebuoys, enableLifebuoys } from '../../../redux/lifebuoys';
import { Answer } from '../../../redux/questions';
import { RootState } from '../../../redux/store';
import { timeout } from '../../../utils/timeout';
import AnswersItem, { Mode } from '../AnswersItem/AnswersItem';

interface Props {
    answers: Answer[];
}

const Answers: React.FC<Props> = ({ answers }) => {
    const [selectedAnswerId, setSelectedAnswerId] = useState<Answer['id']>();
    const [selectedAnswerMode, setSelectedAnswerMode] = useState<Mode>();
    const { current } = useSelector((state: RootState) => state.levels);

    const dispatch = useDispatch();

    const handleAnswer = async (answer: Answer) => {
        let timeoutDuration = 400;
        if (current > 4 && current < 8) {
            timeoutDuration = 700;
        } else if (current >= 8) {
            timeoutDuration = 1200;
        }

        setSelectedAnswerId(answer.id);
        setSelectedAnswerMode('selected');
        dispatch(disableLifebuoys());
        await timeout(timeoutDuration);

        if (answer.isCorrect) {
            setSelectedAnswerMode('correct');
            await timeout(800 + timeoutDuration);
            dispatch(increaseLevel());
        } else {
            setSelectedAnswerMode('incorrect');
            await timeout(800 + timeoutDuration);
            dispatch(increaseLosses());
        }

        dispatch(enableLifebuoys());
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
