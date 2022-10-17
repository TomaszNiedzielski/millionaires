import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { RootState } from '../../../redux/store';

const Levels: React.FC = () => {
    const { current, all } = useSelector((state: RootState) => state.levels);

    return (
        <View style={styles.container}>
            {all.slice(0).reverse().map(({ id, prize }) => (
                <Text
                    key={id}
                    style={[styles.item, current === id && styles.currentLevel]}
                >{prize}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        color: '#fff',
        textAlign: 'center',
        padding: 1,
        margin: 2,
        backgroundColor: Colors.accent,
        borderRadius: 4
    },
    currentLevel: {
        backgroundColor: 'gold'
    }
});

export default Levels;
