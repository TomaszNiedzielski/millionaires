import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AppName from '../components/common/AppName/AppName';
import Background from '../components/common/Background/Background';
import PrimaryButton from '../components/common/PrimaryButton/PrimaryButton';

interface Props {
    navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <AppName />
            <PrimaryButton
                title="Graj"
                onPress={() => navigation.navigate('Game')}
                style={styles.btn}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        padding: 30,
    },
    btn: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center'
    }
});

export default HomeScreen;
