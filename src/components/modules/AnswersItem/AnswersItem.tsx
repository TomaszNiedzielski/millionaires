import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Styles } from '../../../constants/styles';
import { Answer } from '../../../redux/questions';

export type Mode = 'selected' | 'correct' | 'incorrect' | 'disabled' | undefined;

interface Props extends Omit<Answer, 'isCorrect'> {
    onSelect: () => void;
    mode?: Mode;
}

const AnswersItem: React.FC<Props> = ({ id, value, onSelect, mode, isExcluded }) => {
    const animation = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false,
                    delay: 200,
                    easing: Easing.bounce
                }),
            ]),
        ).start();
    }, [mode]);

    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['yellow' , 'green']
    });

    const animatedStyle = {
        backgroundColor: boxInterpolation
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => (!mode && !isExcluded) && onSelect()}
        >
            <Animated.View style={[
                styles.container,
                mode && (mode === 'selected' && styles.selected ||
                mode === 'correct' && animatedStyle ||
                mode === 'incorrect' && styles.incorrect)
            ]}>
                {!isExcluded ? <>
                    <Text style={styles.id}> {id}. </Text>
                    <Text style={styles.value}> {value} </Text>
                </> : null}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        paddingHorizontal: 20,
        borderWidth: .5,
        borderColor: '#fff',
        marginVertical: 6,
        borderRadius: 50,
        fontSize: 20,
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        alignItems: 'center',
    },
    id: {
        color: 'orange',
        fontSize: 24,
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    value: {
        fontSize: 18,
        ...Styles.whiteText,
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
