import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Styles } from '../../../constants/styles';
import { RootState } from '../../../redux/store';

const Call: React.FC = () => {
    const { used, all } = useSelector((state: RootState) => state.questions);
    const [answer, setAnswer] = useState<string>();

    const getRandomText = (answerId: string) => {
        const texts = [
            `Intuicja podpowiada mi że może to być odpowiedź ${answerId}.`,
            `Moim zdaniem możesz śmiało zaznaczyć odpowiedź ${answerId}.`,
            `Strasznie trudne pytanie zadajesz. Ale chyba to będzie odpowiedź ${answerId}.`
        ];

        return texts[Math.floor(Math.random() * texts.length)];
    }

    useEffect(() => {
        const currentQuestionId = used[used.length - 1];
        const currentQuestion = all.find(({ id }) => id === currentQuestionId);
        const correctAnswerId = currentQuestion?.answers.find(({ isCorrect }) => isCorrect)?.id;

        if (correctAnswerId) {
            setAnswer(getRandomText(correctAnswerId));
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{answer}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        ...Styles.whiteText,
        padding: 5
    },
});

export default Call;
