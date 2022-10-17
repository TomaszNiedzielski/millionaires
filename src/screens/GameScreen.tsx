import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../components/modules/Question/Question';
import { Colors } from '../constants/colors';

const GameScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View></View>
            <Question />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 20,
        justifyContent: 'space-between'
    }
});

export default GameScreen;
