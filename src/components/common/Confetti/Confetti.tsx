import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Lottie from 'lottie-react-native';

const Confetti: React.FC = () => {
    const animationProgress1 = useRef(new Animated.Value(0));
    const animationProgress2 = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgress1.current, {
            toValue: .4,
            duration: 1000,
            useNativeDriver: false,
            delay: 1000
        }).start();

        Animated.timing(animationProgress2.current, {
            toValue: .4,
            duration: 1000,
            useNativeDriver: false,
            delay: 2000
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Lottie
                    source={require('../../../assets/1370-confetti.json')}
                    autoPlay
                    loop
                    style={{ height: 300 }}
                    progress={animationProgress1.current}
                />
                <Lottie
                    source={require('../../../assets/1370-confetti.json')}
                    autoPlay
                    loop
                    style={{ height: 300 }}
                    progress={animationProgress2.current}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Lottie
                    source={require('../../../assets/confetti.json')}
                    autoPlay
                    loop
                    style={{ height: 300, position: 'absolute' }}
                />
            </View>
            <View style={styles.row}>
                <Lottie
                    source={require('../../../assets/1370-confetti.json')}
                    autoPlay
                    loop
                    style={{ height: 300 }}
                    progress={animationProgress1.current}
                />
                <Lottie
                    source={require('../../../assets/1370-confetti.json')}
                    autoPlay
                    loop
                    style={{ height: 300 }}
                    progress={animationProgress2.current}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },
    row: {
        flexDirection: 'row'
    }
});

export default Confetti;
