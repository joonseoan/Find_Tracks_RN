import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import styled from 'styled-components';

// OPCAYTY DISABLE
const CheckBoxInputValidation = ({ formikProps, 
                                  // contextState, 
                                    label, name, 
                                    // setAuthUser,
                                    widthBetween, birthday }) => {

    const { values, setFieldValue, touched, errors } = formikProps;
    
    return(        
        <CheckBoxContainer>     
                <CheckBoxGroup 
                    activeOpacity={0.9}
                >  
                    <CheckBoxLabel widthBetween={ widthBetween }>
                        { label }
                    </CheckBoxLabel>
                    <RecCheckBox 
                        onPress={ () => {
                            setFieldValue(name, !values[ name ]);
                            if(name === 'dob_confirm' && !values[name] &&  
                                (birthday.year !== 'YYYY' || birthday.month !== 'MM' ||
                                birthday.day !== 'DD')) {

                                    // setAuthUser({
                                    //     name: 'dob',
                                    //     value: `${ birthday.month } ${ birthday.day }, ${ birthday.year }`
                                    // })
                                }
                        }}
                        onBlur={ () => setFieldTouched(name) }
                    >                    
                        <RecCheckBoxInside                             
                            isChecked={ values[ name ] }
                        />
                    </RecCheckBox>
                </CheckBoxGroup>
                {
                    errors[ name ] && (
                    <CheckBoxErrorMessageGroup >
                        <CheckBoxErrorMessage>{ errors[ name ]}</CheckBoxErrorMessage>
                    </CheckBoxErrorMessageGroup>
                    )
                }
        </CheckBoxContainer>
    );
}

const CheckBoxContainer = styled.View`
    width: ${wp('67%')};
    
    align-items: center;
`;

// need to check responsive of checkbox position
const CheckBoxGroup=styled.View`
  justify-content: flex-end;
`;

// Contrl width...
const CheckBoxLabel = styled.Text`
    width: ${props => props.widthBetween ? wp(props.widthBetween) : wp('55%')};
    margin-top: ${hp('1%')};
    text-transform: uppercase;
    font-size: ${wp('3%')};
    font-weight: 500;
    line-height: 20;
`;

const RecCheckBox = styled.TouchableOpacity`
    width: ${wp('5%')};
    height: ${hp('2.5%')};
    border: solid 2px #00BFFF;
    border-radius: 5px;
    position: absolute;
    right: ${wp('3%')};

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

const CheckBoxErrorMessageGroup = styled.View`
    width: 100%;
    height: 35%;
    margin-right: ${wp('2%')};
    align-items: center;
`;

const CheckBoxErrorMessage = styled.Text`
    color: orangered;
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 2px;
`;

export { CheckBoxInputValidation };