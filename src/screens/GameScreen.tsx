import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, BackHandler } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../components/modules/Question/Question';
import { Colors } from '../constants/colors';
import Levels from '../components/modules/Levels/Levels';
import Lifebuoys from '../components/modules/Lifebuoys/Lifebuoys';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AudienceVotes from '../components/modules/AudienceVotes/AudienceVotes';
import { resetLifebuoys } from '../redux/lifebuoys';
import Call from '../components/modules/Call/Call';
import VictoryModal from '../components/modules/VictoryModal/VictoryModal';
import FailureModal from '../components/modules/FailureModal/FailureModal';
import { resetLevels, resetLosses } from '../redux/levels';

interface Props {
    navigation: NavigationProp<any, any>;
}

const GameScreen: React.FC<Props> = ({ navigation }) => {
    const { lifebuoys } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Zaczekaj!', 'Czy na pewno chcesz wyjść? Stan gry zostanie utracony.', [
                {
                    text: "Anuluj",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Wyjdź", onPress: () => {
                    dispatch(resetLevels());
                    dispatch(resetLosses())
                    dispatch(resetLifebuoys());
                    navigation.goBack();
                } }
            ]);
            return true;
        }
        
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <VictoryModal />
            <FailureModal />
            <View style={styles.top}>
                {lifebuoys.audience.inUse &&
                    <AudienceVotes /> ||
                lifebuoys.call.inUse &&
                    <Call /> ||
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
        justifyContent: 'space-between'
    },
    top: {
        flexDirection: 'row',
        height: Dimensions.get('screen').height * 35 / 100,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15
    }
});

export default GameScreen;
