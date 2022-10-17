import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../components/modules/Question/Question';
import { Colors } from '../constants/colors';
import Levels from '../components/modules/Levels/Levels';
import Lifebuoys from '../components/modules/Lifebuoys/Lifebuoys';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const GameScreen: React.FC = () => {
    const { current, all } = useSelector((state: RootState) => state.levels);

    useEffect(() => {
        if (current === all[all.length - 1].id) {
            Alert.alert('Wygrana!');
        }
    }, [current, all]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Levels />
                <Lifebuoys />
            </View>
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
    },
    top: {
        flexDirection: 'row'
    }
});

export default GameScreen;
