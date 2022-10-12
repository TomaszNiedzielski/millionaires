import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, ViewStyle, View } from 'react-native';

interface Props {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle
}

const PrimaryButton: React.FC<Props> = ({ title, onPress, disabled, style }) => {
    return (
        <View style={[styles.container, style]} testID="PrimaryButton">
            <TouchableNativeFeedback
                onPress={!disabled ? onPress : () => {}}
                disabled={disabled}
                background={TouchableNativeFeedback.Ripple('#000000', true)}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#25084d',
        borderRadius: 40,
        width: '100%',
        borderWidth: 3,
        borderColor: '#1a0536',
    },
    content: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 34,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    }
});

export default PrimaryButton;
