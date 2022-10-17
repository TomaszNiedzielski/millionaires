import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../../../constants/styles';
import { Answer } from '../../../redux/questions';

export type Mode = 'selected' | 'correct' | 'incorrect' | 'disabled' | undefined;

interface Props extends Omit<Answer, 'isCorrect'> {
    onSelect: () => void;
    mode?: Mode;
}

const AnswersItem: React.FC<Props> = ({ id, value, onSelect, mode }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => !mode && onSelect()}
        >
            <Text style={[
                styles.container,
                mode && (mode === 'selected' && styles.selected ||
                mode === 'correct' && styles.correct ||
                mode === 'incorrect' && styles.incorrect)
            ]}>
                <Text>{id}. </Text>
                <Text>{value}</Text>
            </Text>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Styles.whiteText,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 6,
        borderRadius: 50,
        fontSize: 20,
        backgroundColor: '#101094',
    },
    selected: {
        backgroundColor: 'yellow',
    },
    correct: {
        backgroundColor: 'green',
    },
    incorrect: {
        backgroundColor: 'red',
    },
});

export default AnswersItem;
