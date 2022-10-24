import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Styles } from '../../../constants/styles';
import { RootState } from '../../../redux/store';

const Levels: React.FC = () => {
    const { current, all } = useSelector((state: RootState) => state.levels);

    return (
        <View style={styles.container}>
            {all.slice(0).reverse().map(({ id, prize }) => (
                <View key={id} style={styles.item}>
                    {current + 1 === id ? <Image
                        source={require('../../../assets/arrow-right.png')}
                        style={{
                            position: 'absolute',
                            left: 10,
                            alignSelf: 'center',
                            height: 16,
                            width: 16
                        }}
                    /> : null}
                    <Text
                        style={[styles.itemText, current === id && styles.currentLevel]}
                    >{prize}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        margin: 2,
        backgroundColor: 'rgba(108, 108, 245, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        ...Styles.whiteText,
        fontSize: 12,
        textAlign: 'center',
        width: '100%',
        padding: 1,
        borderRadius: 4,
    },
    currentLevel: {
        backgroundColor: 'gold'
    }
});

export default Levels;
