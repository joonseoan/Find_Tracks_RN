import React, { Fragment } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { 
    widthPercentageToDP as wp, heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { LinearGradient } from 'expo-linear-gradient';

import useAuth from '../../hooks/stateManager/auth/useAuth';
import createUser from '../../graphql/mutations/userSignup';
import AuthRenderHandler from './AuthRenderHandler/AuthInputs';
import SubmitButton from './AuthRenderHandler/SubmitButton';

const SignupScreen = ({ navigation, mutate }) => {

    const {
        InputElements,
        isChecked, setIsLogin, 
        isLogin, validationSchema,
        validationInitialValue,
        authInputList,
        userInputs, setUserInputs
    } = useAuth();
    

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
                    <AuthText>{isLogin ? 'Signin' : 'Signup' }</AuthText>              
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
                const { handleSubmit, handleReset, values } = formikProps;
                if(userInputs.dob) {
                    values['dob'] = userInputs.dob;
                }
                return (<Fragment>
                    <LinearGradient 
                        style={{ ...styles.shadow, ...styles.centerLinearGradient }}
                        colors={[ '#FFFFFF', '#F0F8FF', '#FAFAD2', '#7FFFD4' ]}
                        start={[ 0.7, 0.5 ]}
                        end={[ 0.9, 1 ]}
                    >   
                         <AuthRenderHandler 
                            formikProps={ formikProps }
                            authInputList={ authInputList }
                            inputElements={ InputElements }
                            userInputs={ userInputs }
                            setUserInputs={ setUserInputs }
                         />                        
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
                            <SubmitButton
                                handleSubmit={ handleSubmit }
                                isChecked={ isChecked }
                                isLogin={ isLogin }
                                buttonShadow={ styles.buttonShadow }
                            />
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

const AuthText = styled.Text`
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