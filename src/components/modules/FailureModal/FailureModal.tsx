import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetLevels } from '../../../redux/levels';
import { resetLifebuoys } from '../../../redux/lifebuoys';
import { RootState } from '../../../redux/store';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';
import PrimaryModal from '../../common/PrimaryModal/PrimaryModal';
import { styles } from '../VictoryModal/VictoryModal';

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
                <Text style={styles.text}>Przegrana!</Text>
                <Image
                    source={require('../../../assets/crying.png')}
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

export default FailureModal;
