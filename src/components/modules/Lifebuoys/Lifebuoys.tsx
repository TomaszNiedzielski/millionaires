import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import { setAudience, setCall, setHalf } from '../../../redux/lifebuoys';
import { excludeTwoAnswers } from '../../../redux/questions';
import { RootState } from '../../../redux/store';

interface Props {
    children: any;
    onPress: () => void;
    isAvailable: boolean;
    isDisabled: boolean;
}

const Wrapper: React.FC<Props> = ({ children, onPress, isAvailable, isDisabled }) => {
    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('#fff', true)}
            disabled={!isAvailable || isDisabled}
        >
            <View style={styles.itemWrapper}>
                {!isAvailable && <Text style={styles.cross}>X</Text>}
                {children}
            </View>
        </TouchableNativeFeedback>
    );
}

const Lifebuoys: React.FC = () => {
    const { audience, call, half } = useSelector((state: RootState) => state.lifebuoys);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Wrapper
                onPress={() => dispatch(setAudience({ inUse: true, isAvailable: false }))}
                isAvailable={audience.isAvailable}
                isDisabled={audience.isDisabled}
            >
                <Image
                    source={require('../../../assets/people.png')}
                    style={styles.item}
                />
            </Wrapper>
            
            <Wrapper
                onPress={() => dispatch(setCall({ inUse: true, isAvailable: false }))}
                isAvailable={call.isAvailable}
                isDisabled={call.isDisabled}
            >
                <Image
                    source={require('../../../assets/phone.png')}
                    style={styles.item}
                />
            </Wrapper>

            <Wrapper
                onPress={() => {
                    dispatch(setHalf({ inUse: true, isAvailable: false }));
                    dispatch(excludeTwoAnswers());
                }}
                isAvailable={half.isAvailable}
                isDisabled={half.isDisabled}
            >
                <Text style={styles.itemText}>50%</Text>
            </Wrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemWrapper: {
        height: 60,
        width: 60,
        borderWidth: .5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: Colors.accent,
    },
    item: {
        height: '100%',
        width: '100%',
    },
    itemText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cross: {
        color: 'red',
        fontSize: 80,
        position: 'absolute',
        zIndex: 1
    }
});

export default Lifebuoys;
