import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from '../../../constants/styles';
import { resetLevels } from '../../../redux/levels';
import { resetLifebuoys } from '../../../redux/lifebuoys';
import { RootState } from '../../../redux/store';
import Confetti from '../../common/Confetti/Confetti';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';
import PrimaryModal from '../../common/PrimaryModal/PrimaryModal';

const VictoryModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const { all, current } = useSelector((state: RootState) => state.levels);

    const closeModal = () => {
        dispatch(resetLevels());
        dispatch(resetLifebuoys());

        setIsVisible(false);
    }

    useEffect(() => {
        if (current === all[all.length - 1].id) {
            setIsVisible(true);
        }
    }, [all, current]);

    return (
        <PrimaryModal
            isVisible={isVisible}
            onClose={closeModal}
        >
            <View style={styles.container}>
                {isVisible ? <Confetti /> : null}
                <Text style={styles.text}>Zwycięstwo!</Text>
                <Image
                    source={require('../../../assets/trophy.png')}
                    style={styles.image}
                />
                <PrimaryButton
                    title="Graj dalej"
                    style={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={closeModal}
                />
            </View>
        </PrimaryModal>
    );
}

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        width: '100%',
        borderRadius: 20,
    },
    image: {
        height: 130,
        width: 130,
    },
    text: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 15,
        ...Styles.whiteText,
    },
    buttonStyle: {
        width: 200,
        marginTop: 40,
        borderColor: '#fff',
        borderWidth: 1.5
    },
    buttonTitleStyle: {
        fontSize: 22,
    }
});

export default VictoryModal;
