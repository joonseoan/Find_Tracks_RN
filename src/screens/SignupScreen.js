import React, { Fragment, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } 
 from 'react-native-responsive-screen';
import { Formik } from 'formik';

import { LinearGradient } from 'expo-linear-gradient';
import AUTH_INPUTS from '../utils/authInput.json';
import { authValidationSchema } from '../utils/inputValidation';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    ageCheck: undefined
}

const SignupScreen = ({ navigation }) => {

    const [ isChecked, setIsChecked ] = useState(false)
    
    const handleCheckBox = (values, name) => {        
        setIsChecked(!isChecked);
        values[name] = !isChecked;
    }

    const textInput = (formikProps, input) => {
        const { values, setFieldTouched, handleChange } = formikProps;                
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
            </Fragment>
        );
    }

    const checkBoxInput = (formikProps, input) => {
        const { values, setFieldTouched, handleChange } = formikProps;        
        return (
            <Fragment>
                <RecCheckBox 
                    onPress={ () => handleCheckBox(values, input.name) }
                    onBlur={ () => setFieldTouched(input.name) }
                >                    
                    <RecCheckBoxInside isChecked={ isChecked } />
                </RecCheckBox>
            </Fragment>
        )
    }

    const submitButton = handleSubmit => {
        return (
            <PageMainButton 
                isChecked={ isChecked } 
                style={ styles.buttonShadow }
                onPress={ handleSubmit }
            >
                <SignupText role='#FFFFFF'>
                    Impact on future
                </SignupText>
            </PageMainButton>
        );
    }

    const signupInputs = formikProps => {
        const { touched, errors } = formikProps;
        return AUTH_INPUTS.map((input, index) => {
            return (
                <InputGroup key={ index } isCheckBox={ input.name }>
                    <InputLabel isCheckBox = { input.name }>{ input.label }</InputLabel>
                    { 
                        input.name !== 'ageCheck' ? 
                        textInput(formikProps, input) :    
                        checkBoxInput(formikProps, input)
                    }
                    {(
                        touched[input.name] && errors[input.name]) && (
                        <ValidationError isCheckBox={ input.name }>{ errors[input.name] }</ValidationError>
                    )}
                </InputGroup>
            )
        });
    }

    return(
        <SignupContainer>
            <LinearGradient 
                style={ styles.backgroundLinearGradient }
                colors={[ '#FFFFFF', '#7FFFD4', '#F0F8FF', '#00FFFF' ]}
                start={[ 0.5, 0.9 ]}
                end={[ 0.2, 0.2 ]}
            >   
                <View
                    style={{ ...styles.signupTitleGroup, ...styles.titleShadow }}
                >          
                    <SignupText>Signup</SignupText>              
                </View>
            </LinearGradient>
            
            <Formik 
                initialValues={ initialValues }
                validationSchema={ authValidationSchema }
                onSubmit={ (values, isSubmitting) => {
                    console.log('values in Submit: ', values)
                }}
            >
            { formikProps => {
                const { handleSubmit } = formikProps;
                return (<Fragment>
                    <LinearGradient 
                        style={{ ...styles.shadow, ...styles.centerLinearGradient }}
                        colors={[ '#FFFFFF', '#F0F8FF', '#FAFAD2', '#7FFFD4' ]}
                        start={[ 0.7, 0.5 ]}
                        end={[ 0.9, 1 ]}
                    >   
                        { signupInputs(formikProps) }                        
                    </LinearGradient>              
                    <NoLinearGradient>
                        { submitButton(handleSubmit) }
                    </NoLinearGradient>
                </Fragment>
            )}}
            </Formik>
        </SignupContainer>
    );
}

const SignupContainer = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
`;

const styles = StyleSheet.create({
    backgroundLinearGradient: {
        width: wp('100%'),
        height: hp('50%'),
        paddingTop: hp('2.5%'),
        alignItems: 'center',
        flex: 1 
    },
    signupTitleGroup: {
        width: wp('85%'),
        height: hp('7%'),
        // borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerLinearGradient: {
        width: wp('85%'),
        height: hp('70%'),
        position: 'absolute',
        top: hp('10%'),
        zIndex: 1,
        // borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 8,
        shadowRadius: 10,
        elevation: 15,
    },
    titleShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height: 1,
        },
        shadowOpacity: 8,
        shadowRadius: 10,
        elevation: 1.5
    },
    buttonShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0,
        shadowRadius: 10,
        elevation: 2,
    }
});

const InputGroup = styled.View`
    height: ${hp('12%')};
    flex-direction: ${ 
        props => props.isCheckBox === 'ageCheck' ? 'row' : 'column'
    }
`;

const InputLabel = styled.Text`
    margin-left: ${
        props => props.isCheckBox === 'ageCheck' ? 0 : wp('2%')
    };
    margin-bottom: 4px;
    text-align-vertical: center;
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => props.isCheckBox === 'ageCheck' ? 'orangered'  : '#D4AF37' };
`;

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
    }
`;

const ValidationError = styled.Text`
    color: orangered;
    align-self: flex-end;
    margin-top: 4px;
    padding-right: ${wp('2%')};
    display: ${props =>  props.isCheckBox === 'ageCheck' ? 'none' : 'undefined' }
`;

const NoLinearGradient = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding-bottom: ${hp('2%')};
`;

const PageMainButton = styled.TouchableOpacity`
    width: ${wp('70%')};    
    height: ${hp('5%')};
    display: ${ props => !props.isChecked ? 'none' : 'flex' }; 
    background-color: #00BFFF;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const SignupText = styled.Text`
    font-size: ${props => !props.role ? wp('5%') : wp('4%') };
    font-weight: 700;
    color: ${ props => !props.role ? '#483D8B' : props.role };
    text-transform: uppercase;
`;

export default SignupScreen;