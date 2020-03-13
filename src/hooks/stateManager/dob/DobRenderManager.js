import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components';

import { ModalButton, CheckboxValidation } from '../../../components/common';

const DobRenderManager = ({ birthday, dobConfirmInitialValue, validationSchema, 
                    setAuthUser, setModalState, modalState }) => {

    if(birthday.invalidMessage && 
        (birthday.day === 'DD' || 
         birthday.month === 'MM' || 
         birthday.year || 'YYYY')) {

        return(
          <View>
            <Text>{ birthday.invalidMessage }</Text>
          </View>
        );
    } else {
        return(
          <Formik
                initialValues={ dobConfirmInitialValue }
                validationSchema={ validationSchema }
                onSubmit={ values => {
                    // nothing is to be done.
                    // console.log('submit', values)
                }}
            > 
            { formikDobProps => {
                const { values, handleSubmit } = formikDobProps;
            
                return(
                    <Fragment>
                        <CheckboxValidation
                            formikProps={ formikDobProps }
                            contextState={ values['dob_confirm'] }
                            label="I confirm my birthday above."
                            name="dob_confirm"
                            setAuthUser={ setAuthUser }
                            birthday={ birthday }
                            widthBetween="55%"
                        />
                        <DobButtonGroup isChecked={ values['dob_confirm'] }>
                            <ModalButton
                                backgroundColor="#00BFFF"
                                color="#FFFFFF"
                                onPress={ () => {
                                    if(values["dob_confirm"] && 
                                       birthday.month !== 'MM' && 
                                       birthday.day !== 'DD' && 
                                       birthday.year !== 'YYYY') {
                                        setModalState(!modalState);
                                        handleSubmit();
                                    }
                                }}
                            >
                                <DobButton>Done</DobButton>
                            </ModalButton>
                        </DobButtonGroup>
                    </Fragment>
                );
            }}
            </Formik>
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