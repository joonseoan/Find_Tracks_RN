import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { 
  widthPercentageToDP as wp, heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

// [Important]
// we can use withNavigation wich are not wraped by createStackNavigation in App.js
import { withNavigation } from 'react-navigation';

// still need to have props, navigation
const NavLink = ({ navigation, text, routeName, isLogin, handleReset, setIsLogin, linkName }) => {
  return(
    <AuthStatusChange>
        <AuthStatusChangeStatement>
            { text } 
        </AuthStatusChangeStatement>
        <TouchableOpacity onPress={() => {
            // withNavigation is used to use the one below.
            navigation.navigate(routeName);
            setIsLogin(!isLogin);
            handleReset(); 
        }}>
            <AuthStatusChangeEventText>
                { linkName }
            </AuthStatusChangeEventText>
        </TouchableOpacity>
    </AuthStatusChange>    
  );
}

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

export default withNavigation(NavLink);

