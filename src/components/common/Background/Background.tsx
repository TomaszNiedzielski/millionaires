import React from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

const Background: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/background.png')}
                style={styles.img}
                accessibilityRole="image"
            />
            <View style={styles.shadow} />
        </View>
    );
}

const inset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    img: {
        width,
        height,
        ...inset,
    },
    shadow: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        ...inset,
    }
});

export default Background;
