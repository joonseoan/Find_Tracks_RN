import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components';
import { SafeAreaView } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
 from 'react-native-responsive-screen';

import { Context as AuthContext } from '../contexts/authContext/authContext';
const AccountScreen = props => {

    const { signout } = useContext(AuthContext);

    return(
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text>Account Screen</Text>
            <Button 
                title="Sign Out"
                onPress={ signout } 
            />    
        </SafeAreaView>
        
    )
}

export default AccountScreen;