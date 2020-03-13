import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const ModalButton = ({ children, onPress, backgroundColor }) => {
    return(
        <ModalButtonContainer
            style={ styles.buttonShadow }
            onPress={ () => onPress() }
            backgroundColor={ backgroundColor }
        >
            { children }
        </ModalButtonContainer>
    );
}

const ModalButtonContainer = styled.TouchableOpacity`
    width: ${wp('30%')};
    height: ${hp('4.5%')};
    background-color: ${ props => props.backgroundColor };
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const styles = StyleSheet.create({
    buttonShadow: {
        shadowColor: 'red',
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 10,
    }
})

export { ModalButton };