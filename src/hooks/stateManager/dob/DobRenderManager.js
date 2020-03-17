import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import { ModalButton, CheckboxValidation } from '../../../components/common';

const DobRenderManager = ({ 
    birthday, dobConfirm, setDobConfirm,                  
    setModalState, modalState }) => {

    if(birthday.invalidMessage && 
        (birthday.day !== 'DD' || 
         birthday.month !== 'MM' || 
         birthday.year !== 'YYYY')) {

        return(
          <View>
            <Text>{ birthday.invalidMessage }</Text>
          </View>
        );

    } else {

        return(        
            birthday.year !== "YYYY" &&
            birthday.month !== 'MM' &&
            birthday.day !== 'DD' ? (
                <Fragment>
                    <CheckboxValidation
                    label="I confirm my birthday above."
                    name="dob_confirm"
                    birthday={ birthday }
                    widthBetween="55%"
                    dobConfirm={ dobConfirm }
                    setDobConfirm={ setDobConfirm }
                />
                    <DobButtonGroup isChecked={ dobConfirm }>
                        <ModalButton
                            backgroundColor="#00BFFF"
                            color="#FFFFFF"
                            onPress={ () => {
                                if(birthday.month !== 'MM' && 
                                    birthday.day !== 'DD' && 
                                    birthday.year !== 'YYYY') {
                                    setModalState(!modalState);
                                }
                            }}
                        >
                            <DobButton>Done</DobButton>
                        </ModalButton>
                    </DobButtonGroup>
                </Fragment>
            ) :
            <Fragment>
                <Text>Please select your date of birth.</Text>
            </Fragment>
        );
            
    }
}

const DobButtonGroup = styled.View`
   display: ${props =>  props.isChecked ? 'flex' : 'none' }
   margin-top: 2%;
`;

const DobButton = styled.Text`
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: 700;
`;

export default DobRenderManager;