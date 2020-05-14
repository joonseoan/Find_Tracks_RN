import React, { useContext } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../contexts/authContext/authContext';
import { FontAwesome } from '@expo/vector-icons';


const AccountScreen = props => {

    const { signout } = useContext(AuthContext);

    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
            <OuterView>
            <AccountTitleView>
                <AccountTitleText>Account Screen</AccountTitleText>
            </AccountTitleView>
                <Button 
                    title="Sign Out"
                    onPress={ signout }
                />    
            </OuterView>
        </SafeAreaView>        
    )
}

AccountScreen.navigationOptions={
    title: 'Account',
    tabBarIcon: <FontAwesome name="gear" size={ 20 } />
}

const OuterView = styled.View`
    background-color: #FFFFFF;
    flex: 1;
    align-items: center;
`;

const AccountTitleView = styled.View`
    height: ${ hp('15%') };
    margin-left: ${ wp('2%') };
    align-self: flex-start;

    justify-content: center;
`;

const AccountTitleText = styled.Text`
    color: #438899;
    font-size: ${ wp('7%') };
    font-weight: 700;
`;

export default AccountScreen;