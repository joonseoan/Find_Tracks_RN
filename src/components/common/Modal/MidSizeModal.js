import React from 'react';
import { View, Text, Modal, Alert, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const MidSizeModal = ({ modalState, setModalState, children }) => {

    return(<>
        <Modal
            animationType="fade"
            transparent={ true }
            visible={ modalState }
        >
            <ModalContentContainer>
                <ModalGroup>
                    { children }
                </ModalGroup>
            </ModalContentContainer>
        </Modal>
    </>)
}

const ModalContentContainer = styled.View`
    flex: 1;
    background-color: rgba(191, 191, 191, 0.7);
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ModalGroup = styled.View`
    width: ${wp('87%')};
    height: ${hp('70%')};
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    padding: 2%;

    justify-content: center;
    align-items: center;
`;

export { MidSizeModal };