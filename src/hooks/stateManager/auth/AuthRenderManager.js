import React, { Fragment } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import styled from 'styled-components';

import DobSelect from '../../../components/CalendarSelect/DobSelect';

const AuthRenderManager = ({ formikProps, input, isChecked, 
    modalState, setModalState, handleCheckBox}) => {

    const { values, setFieldTouched, handleChange } = formikProps;

    if(input.type !== 'checkbox' && input.type !== 'inputButton') {
        return (
            <Fragment>
                <RoundTextInput
                    keyboardtype="default"
                    value={ values[input.name] }
                    onChangeText={ handleChange(input.name) }
                    placeholder={ input.placeholder || "" }
                    onBlur={ () => setFieldTouched(input.name) }
                    secureTextEntry={ (input.name === "password" ||
                                        input.name === "confirmPassword") && 
                                        true 
                    }
                />
            </Fragment>)
    } else {
        if(input.type === 'inputButton') {
            return (
                <Fragment>
                    <InputBUtton 
                        activeOpacity={ 1 }
                        onPress={ () => setModalState(!modalState) }
                    >              
                        <RoundTextInput
                            formikProps={ formikProps }
                            // contextState={ state }
                            label={ input.label }
                            name={ input.name }
                            placeholder={ input.placeholder }
                            modalState={ modalState }
                            setModalState={ setModalState }
                            
                            editable={ name === 'dob' ? false : true }
                            underlineColorAndroid="transparent"
                        />
                        <DobSelect 
                            modalState={  modalState }
                            setModalState={ setModalState }
                            // formikProps={ formikProps }
                            // contextState={ state }
                            // setAuthUser={ setAuthUser }
                        />            
                    </InputBUtton>
                </Fragment>
            );
        }

        if(input.type === 'checkbox') {
            return (
                <Fragment>
                    <RecCheckBox 
                        onPress={ () => handleCheckBox(values, input.name) }
                        onBlur={ () => setFieldTouched(input.name) }
                    >                    
                        <RecCheckBoxInside isChecked={ isChecked } />
                    </RecCheckBox>
                </Fragment>
            );
        }
    }
    
}


const RoundTextInput = styled.TextInput`
    width: ${wp('75%')};
    height: ${hp('5%')};
    padding-horizontal: ${wp('4%')};
    background-color: rgba(173, 216, 230, 0.1);
    border-radius: 15px;
    border: 3px;
    border-color: #00BFFF;
    font-size: ${wp('4%')};
    color: #2F4F4F; 
    font-weight: 500;
`;

const InputBUtton = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
`;

const RecCheckBox = styled.TouchableOpacity`
    width: ${wp('5%')};
    height: ${hp('2.5%')};
    margin-left: 7px;
    margin-bottom: 3px;
    border: solid 2px #00BFFF;
    border-radius: 5px;
    align-self: center;    
    justify-content: center;
    align-items: center;
`;

const RecCheckBoxInside = styled.View`
    width: ${wp('3%')};
    height: ${hp('1.5%')};
    background-color: #00BFFF;
    border-radius: 3px;
    display: ${
        props => !props.isChecked ? 'none' : 'flex'
    };
`;

export default AuthRenderManager;