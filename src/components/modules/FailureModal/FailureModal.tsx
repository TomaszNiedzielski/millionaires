import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetLevels } from '../../../redux/levels';
import { resetLifebuoys } from '../../../redux/lifebuoys';
import { RootState } from '../../../redux/store';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';
import PrimaryModal from '../../common/PrimaryModal/PrimaryModal';

const FailureModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [lossesWatcher, setLossesWatcher] = useState(0);

    const dispatch = useDispatch();
    const { losses } = useSelector((state: RootState) => state.levels);

    const closeModal = () => {
        dispatch(resetLevels());
        dispatch(resetLifebuoys());

        setIsVisible(false);
    }

    useEffect(() => {
        if (losses > lossesWatcher) {
            setIsVisible(true);
        }
        setLossesWatcher(losses);
    }, [losses]);

    return (
        <PrimaryModal
            isVisible={isVisible}
            onClose={closeModal}
        >
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/crying.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>Przegrana!</Text>
                <PrimaryButton
                    title="Graj od nowa"
                    style={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={closeModal}
                />
            </View>
        </PrimaryModal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 130,
        width: 130,
    },
    text: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    buttonStyle: {
        width: 160,
        marginTop: 40,
    },
    buttonTitleStyle: {
        fontSize: 22,
    }
});

export default FailureModal;
