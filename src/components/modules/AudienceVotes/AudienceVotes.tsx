import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { RootState } from '../../../redux/store';

const Bar: React.FC<{ id: string; percentage: number }> = ({ id, percentage }) => {
    const height = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(height, {
            toValue: percentage,
            bounciness: 1,
            speed: 1,
            useNativeDriver: false
        }).start();
    }, [id, percentage]);

    return (
        <View style={styles.barContainer}>
            <Text style={styles.barText}>{percentage}%</Text>
            <View style={styles.bar}>
                <Animated.View style={[styles.barContent, { height: height.interpolate({
                    inputRange: [0, percentage],
                    outputRange: ['0%', `${percentage}%`]
                }), }]} />
            </View>
            <Text style={styles.barText}>{id}</Text>
        </View>
    );
}

interface Votes {
    A: number;
    B: number;
    C: number;
    D: number;
}

const AudienceVotes: React.FC = () => {
    const { used, all } = useSelector((state: RootState) => state.questions);
    const [votes, setVotes] = useState<Votes>();

    const getRandomPercentageValues = () => {
        let sum = 100;
        const votesValues = [];
        for (let i = 0; i < 3; i++) {
            const value = Math.floor(Math.random() * sum);
            votesValues.push(value);
            sum -= value;
        }
        votesValues.push(sum);

        return votesValues;
    }

    useEffect(() => {
        let votesValues = getRandomPercentageValues();

        const currentQuestionId = used[used.length - 1];
        const currentQuestion = all.find(({ id }) => id === currentQuestionId);
        const correctAnswerId = currentQuestion?.answers.find(({ isCorrect }) => isCorrect)?.id;

        const highestScore = Math.max(...votesValues);
        const highestScoreIndex = votesValues.indexOf(highestScore);

        const votes: any = {
            A: undefined,
            B: undefined,
            C: undefined,
            D: undefined
        }

        if (correctAnswerId) {
            votes[correctAnswerId] = votesValues[highestScoreIndex];
            votesValues = votesValues.filter((_item, i) => i !== highestScoreIndex);

            for (const item in votes) {
                if (votes[item] === undefined) {
                    votes[item] = votesValues.pop();
                }
            }
        }

        setVotes(votes);
    }, []);

    if (votes) {
        return (
            <View style={styles.container}>
                <Bar
                    id="A"
                    percentage={votes.A}
                />
                <Bar
                    id="B"
                    percentage={votes.B}
                />
                <Bar
                    id="C"
                    percentage={votes.C}
                />
                <Bar
                    id="D"
                    percentage={votes.D}
                />
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 6,
        flexDirection: 'row',
    },
    barContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
    },
    barText: {
        color: '#fff',
    },
    bar: {
        flex: 1,
        width: 25,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        justifyContent: 'flex-end',
        borderWidth: .5,
        borderColor: '#fff',
        marginVertical: 5
    },
    barContent: {
        backgroundColor: Colors.accent,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    }
});

export default AudienceVotes;
