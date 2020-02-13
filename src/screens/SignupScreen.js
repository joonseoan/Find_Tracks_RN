import React from 'react';
import { View, Text, Button } from 'react-native';
// import styled from 'styled-components';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
//  from 'react-native-responsive-screen';

const SignupScreen = ({ navigation }) => {
    return(
        <View>
 
            <Button 
                title="Go to Signin"
                onPress={ () => navigation.navigate('Signin')}
            />
            <Button 
                title="Go to main flow"
                onPress={ () => navigation.navigate('mainFlow') }
            />
        </View>
    )
}

export default SignupScreen;