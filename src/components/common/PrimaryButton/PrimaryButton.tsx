import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, ViewStyle, View, TextStyle } from 'react-native';
import { Colors } from '../../../constants/colors';

interface Props {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    titleStyle?: TextStyle;
}

const PrimaryButton: React.FC<Props> = ({ title, onPress, disabled, style, titleStyle }) => {
    return (
        <View style={[styles.container, style]} testID="PrimaryButton">
            <TouchableNativeFeedback
                onPress={!disabled ? onPress : () => {}}
                disabled={disabled}
                background={TouchableNativeFeedback.Ripple('#000000', true)}
            >
                <View>
                    <Text style={[styles.title, titleStyle]}>{title}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderRadius: 40,
        width: '100%',
        borderWidth: 3,
        borderColor: '#1a0536',
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
