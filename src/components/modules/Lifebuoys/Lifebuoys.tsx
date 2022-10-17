import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

const Wrapper: React.FC<{
    children: any;
    onPress: () => void;
}> = ({ children, onPress }) => {
    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('#fff', true)}
        >
            <View style={styles.itemWrapper}>
                {children}
            </View>
        </TouchableNativeFeedback>
    );
}

const Lifebuoys: React.FC = () => {
    return (
        <View style={styles.container}>
            <Wrapper
                onPress={() => console.log('ściepa publiki')}
            >
                <Image
                    source={require('../../../assets/people.png')}
                    style={styles.item}
                />
            </Wrapper>
            
            <Wrapper
                onPress={() => console.log('telefon do przyjaciela')}
            >
                <Image
                    source={require('../../../assets/phone.png')}
                    style={styles.item}
                />
            </Wrapper>

            <Wrapper
                onPress={() => console.log('połóweczke bym poprosił')}
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
    }
});

export default Lifebuoys;
