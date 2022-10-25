import React from 'react';
import { Image, Modal, StyleSheet, View } from 'react-native';

interface Props {
    children?: React.ReactNode;
    onClose?: () => void;
    isVisible?: boolean;
}

const PrimaryModal: React.FC<Props> = ({ children, onClose, isVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image
                        source={require('../../../assets/background.png')}
                        style={styles.background}
                    />
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
        width: '80%',
        height: '60%',
        borderWidth: 5,
        borderColor: '#fff'
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        borderRadius: 20,
    }
});

export default PrimaryModal;
