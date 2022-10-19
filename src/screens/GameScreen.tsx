import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../components/modules/Question/Question';
import { Colors } from '../constants/colors';
import Levels from '../components/modules/Levels/Levels';
import Lifebuoys from '../components/modules/Lifebuoys/Lifebuoys';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AudienceVotes from '../components/modules/AudienceVotes/AudienceVotes';
import { resetLifebuoys } from '../redux/lifebuoys';

const GameScreen: React.FC = () => {
    const { levels: { current, all }, lifebuoys } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (current === all[all.length - 1].id) {
            Alert.alert('Wygrana!');
            dispatch(resetLifebuoys());
        }
    }, [current, all]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                {lifebuoys.audience.inUse ?
                    <AudienceVotes /> :
                <Levels />}
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
        flexDirection: 'row',
        height: Dimensions.get('screen').height * 30 / 100,
    }
});

export default GameScreen;
