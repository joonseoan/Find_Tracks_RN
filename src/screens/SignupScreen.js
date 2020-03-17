import React, { Fragment, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } 
 from 'react-native-responsive-screen';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { LinearGradient } from 'expo-linear-gradient';

import useAuth from '../hooks/stateManager/auth/useAuth';
import createUser from '../graphql/mutations/createUser';

const SignupScreen = ({ navigation, mutate }) => {

    const {
        InputElements,
        isChecked, setIsLogin, 
        isLogin, validationSchema,
        validationInitialValue,
        authInputList, handleCheckBox,
    } = useAuth();
    
    const submitButton = handleSubmit => {
        return (
            <PageMainButton 
                isChecked={ isChecked }
                isLogin={ isLogin } 
                style={ styles.buttonShadow }
                onPress={ handleSubmit }
            >
                <SignupText role='#FFFFFF'>
                    { isLogin ? 'Login' : 'Impact on future' }
                </SignupText>
            </PageMainButton>
        );
    }

    const signupInputs = formikProps => {
        const { touched, errors } = formikProps;
        // console.log(AUTH_INPUTS())
        return authInputList().map((input, index) => {
            return ( 
                <InputGroup key={ index } isCheckBox={ input.name }>     
                    <InputLabel isCheckBox = { input.name }>{ input.label }</InputLabel>
                    {
                        InputElements(formikProps, input)
                    }
                    {
                        (touched[input.name] && errors[input.name]) && (
                        <ValidationError isCheckBox={ input.name }>{ errors[input.name] }</ValidationError>)
                    }
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
                    <SignupText>{isLogin ? 'Signin' : 'Signup' }</SignupText>              
                </View>
            </LinearGradient>
            
            <Formik 
                initialValues={ validationInitialValue }
                validationSchema={ validationSchema }
                onSubmit={ async (values, setSubmitting) => {
                    await mutate({ variables: values });
                    setSubmitting(false);
                }}
            >
            { formikProps => {
                const { handleSubmit, handleReset } = formikProps;
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
                        <AuthStatusChange>
                            <AuthStatusChangeStatement>
                                { isLogin ? "Don't you have an account?" : "Do you have an account?" } 
                            </AuthStatusChangeStatement>
                            <TouchableOpacity onPress={() => {
                                setIsLogin(!isLogin);
                                handleReset(); 
                            }}>
                                <AuthStatusChangeEventText>
                                    { isLogin ? "Signup" : "Signin" }
                                </AuthStatusChangeEventText>
                            </TouchableOpacity>
                        </AuthStatusChange>
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
    justify-content: center;
    margin-top: ${hp('3.2%')}; 
`;

const styles = StyleSheet.create({
    backgroundLinearGradient: {
        width: wp('100%'),
        height: hp('50%'),
        paddingTop: hp('4.5%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        top: hp('12%'),
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

const ValidationError = styled.Text`
    color: orangered;
    align-self: flex-end;
    margin-top: 4px;
    padding-right: ${wp('2%')};
    display: ${props =>  props.isCheckBox === 'ageCheck' ? 'none' : 'flex' };
`;

const NoLinearGradient = styled.View`
    flex: 1;
    padding-bottom: ${hp('2%')};
    
    justify-content: flex-end;
    align-items: center;
`;

const AuthStatusChange = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: ${hp('9%')};
    justify-content: center;
`;

const AuthStatusChangeStatement=styled.Text`
    color: #000000;
    font-weight: 700;
    margin-right: 10px;
    text-transform: uppercase;
`;

const AuthStatusChangeEventText=styled.Text`
    color: #00BFFF;
    font-weight: 700;
    text-transform: uppercase;
`;

const PageMainButton = styled.TouchableOpacity`
    width: ${wp('70%')};    
    height: ${hp('5%')};
    display: ${ props => (!props.isLogin && !props.isChecked) ? 'none' : 'flex' };
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

// Removing heasers
// 2)
SignupScreen.navigationOptions = { headerShown: false };

// 1)
// SignupScreen.navigationOptions = () => {
//     return {
//         header: null
//     };
// }

export default graphql(createUser)(SignupScreen);