import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAudience } from '../../../redux/lifebuoys';
import { RootState } from '../../../redux/store';

const Wrapper: React.FC<{
    children: any;
    onPress: () => void;
    isAvailable: boolean;
}> = ({ children, onPress, isAvailable }) => {
    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('#fff', true)}
            disabled={!isAvailable}
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
            >
                <Image
                    source={require('../../../assets/people.png')}
                    style={styles.item}
                />
            </Wrapper>
            
            <Wrapper
                onPress={() => console.log('telefon do przyjaciela')}
                isAvailable={call.isAvailable}
            >
                <Image
                    source={require('../../../assets/phone.png')}
                    style={styles.item}
                />
            </Wrapper>

            <Wrapper
                onPress={() => console.log('połóweczke bym poprosił')}
                isAvailable={half.isAvailable}
            >
                <Text style={styles.itemText}>50%</Text>
            </Wrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemWrapper: {
        height: 60,
        width: 60,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        marginVertical: 10,
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
