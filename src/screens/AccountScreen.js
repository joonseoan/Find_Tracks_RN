import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
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