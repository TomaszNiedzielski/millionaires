import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { Answer } from '../../../redux/questions';
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

interface Vote {
    id: string;
    value: number | undefined;
}

const AudienceVotes: React.FC = () => {
    const { used, all } = useSelector((state: RootState) => state.questions);
    const [votes, setVotes] = useState<Vote[]>([]);

    const getRandomPercentageValues = (number: number) => {
        let sum = 100;
        const votesValues = [];
        for (let i = 0; i < number - 1; i++) {
            const value = Math.floor(Math.random() * sum);
            votesValues.push(value);
            sum -= value;
        }
        votesValues.push(sum);

        return votesValues;
    }

    useEffect(() => {
        const currentQuestionId = used[used.length - 1];
        const currentQuestion = all.find(({ id }) => id === currentQuestionId);

        if (!currentQuestion) return;

        const answers = currentQuestion.answers;
        const correctAnswerId = answers.find(({ isCorrect }) => isCorrect)?.id;

        // For the case when half of answers can be excluded we need to check how many answers are available
        const availableAnswers: Answer[] = [];
        answers.map(item => {
            if (!item.isExcluded) {
                availableAnswers.push(item);
            }
        });

        let votesValues = getRandomPercentageValues(availableAnswers.length);

        const highestScore = Math.max(...votesValues);
        const highestScoreIndex = votesValues.indexOf(highestScore);

        const votes = availableAnswers.map(({ id, isCorrect }) => {
            return {
                id: id,
                value: isCorrect ? votesValues[highestScoreIndex] : undefined
            }
        });

        votesValues = votesValues.filter((_item, i) => i !== highestScoreIndex);

        if (correctAnswerId) {
            votes.forEach(item => {
                if (item.value === undefined) {
                    item.value = votesValues.pop();
                }
            });
        }

        setVotes(votes);
    }, []);

    if (votes) {
        return (
            <View style={styles.container}>
                {votes.map(({ id, value }) => (
                    <Bar
                        key={id}
                        id={id}
                        percentage={value || 0}
                    />
                ))}
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
        height: '100%',
        justifyContent: 'center'
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
