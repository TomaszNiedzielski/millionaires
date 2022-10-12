import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

const AppName: React.FC = () => {
    return (
        <Text style={styles.title}>
            <Text style={styles.titlePart1}>Fame</Text>
            <Text style={styles.titlePart2}>Milionerzy</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, .6)',
    },
    titlePart1: {
        fontSize: 52
    },
    titlePart2: {
        fontSize: 22
    },
});

export default AppName;
