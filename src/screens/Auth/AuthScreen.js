import React, { Fragment } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { 
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange 
} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
// [ INPORTANT ]
// 2) It is alternative or another way to use navigation.addListener below.
// import { NavigationEvents } from 'react-navigation';

import useAuth from '../../hooks/stateManager/auth/useAuth';
import AuthRenderHandler from './AuthRenderHandler/AuthInputs';
import { PageMainButton } from '../../components/common';
// import SubmitButton from './AuthRenderHandler/SubmitButton';
import NavLink from '../../components/NavLink';

const AuthScreen = ({ navigation }) => {
    
    // 1)
    // [ Important !!!!]
    // It should be placed at useAuth btw.
    // It is only for example
    
    // useEffect(() => {
    //     // whenever navigation passes this "AuthScreen" even though it was rendered arleady,
    //     // this navigation addListener will be invoked "once" this page's rendering is done
    //     //      which is "didFocus"
    //     const listener = navigation.addListener('didFocus', () => {
    //         // some function
    //         // getBlogPost()
    //     });
        // same as willUnmount()
        //    return () => {
        //        listener.remove()
        //    }
    // })

    const {
        InputElements,
        isChecked, setIsLogin, 
        isLogin, validationSchema,
        validationInitialValue,
        authInputList,
        userInputs, setUserInputs,
        signup, signin, signout, state,
        clearErrorMessage,
        setIsChecked
    } = useAuth();

    // console.log('reducer state: ', state);

    return(
        <AuthContainer>
            {/* NOT WORKING IN THE SAME PAGE. */}
            {/* NavigationEvents can be displayed at anyplace what so ever. */}
            {/* {<NavigationEvents 
                // NavigationEvents properties
                // tabPress ==> when navigation tab pressed
                // isFocused with withNavigationFocus when the current location is dispayed 
                // onWillFocus={ () => { console.log('onWillFocus')}} // It will be invoked at anytime it is about to be reached to this screen (Before)
                // onDidFocus={ () => { console.log('onDidFocus') }} // It will be invoked at anytime it was just reached to this screen (After)
                // onWillBlur={ () => { console.log('onWillBlur') }} // It will be invoked at anytime the current screen navigate awaty (when we leave)
                // onDidBlur={ () => { console.log('onWillBlur') }} // Do not remind it.
                // onWillBlur={ clearErrorMessage }
                onWillFocus={ () => clearErrorMessage() }

                // In react-navigation doc
                willFocus - the screen will focus (maybe we can use in JSX) while JSX Rendering
                didFocus - the screen focused (if there was a transition, the transition completed) --> useEffect after JSX REndering
                willBlur - the screen will be unfocused Before we get to the next page in JSX
                didBlur - the screen unfocused (if there was a transition, the transition completed)

                // Do not forget we can use addEventListener as well.


            />} */}
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
                onSubmit={ async (values, {setSubmitting}) => {
                    if(!isLogin) {
                        const { confirmPassword, ...noA } = userInputs;
                        signup({ ...noA });
                    } else {
                        signin(userInputs);
                    }
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
                        { state.errorMessage ? <Text>{ state.errorMessage }</Text> : null }
                        {/* 2) */}
                        <NavLink
                            navigation={ navigation }
                            text={ isLogin ? "Don't you have an account?" : "Do you have an account?" }
                            routeName={ isLogin ? 'Auth' : 'Auth' } // when separting { isLogin ? 'Signup' : 'Signin'  }
                            isLogin={ isLogin }
                            setIsLogin={ setIsLogin }
                            handleReset={ handleReset }
                            linkName={ isLogin ? 'Signup' : 'Signin' }
                            setUserInputs={ setUserInputs }
                            setIsChecked={ setIsChecked }
                            clearErrorMessage={ clearErrorMessage }
                        />
                        {/* 1) */}
                        {/* {<AuthStatusChange>  
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
                        </AuthStatusChange>} */}
                            <PageMainButton
                                handleSubmit={ handleSubmit }
                                isChecked={ isChecked }
                                isLogin={ isLogin }
                                buttonShadow={ styles.buttonShadow }
                            >
                                <AuthText role='#FFFFFF'>
                                    { isLogin ? 'Login' : 'Impact on future' }
                                </AuthText>
                            </PageMainButton>
                    </NoLinearGradient>
                </Fragment>
            )}}
            </Formik>
        </AuthContainer>
    );
}

const AuthContainer = styled.View`
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

const AuthText = styled.Text`
    font-size: ${props => !props.role ? wp('5%') : wp('4%') };
    font-weight: 700;
    color: ${ props => !props.role ? '#483D8B' : props.role };
    text-transform: uppercase;
`;

// Removing heasers
// 2)
AuthScreen.navigationOptions = { headerShown: false };

// 1)
// SignupScreen.navigationOptions = () => {
//     return {
//         header: null
//     };
// }

export default AuthScreen;