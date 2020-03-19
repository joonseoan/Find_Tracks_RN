import React from 'react';
import styled from 'styled-components';
import { 
  widthPercentageToDP as wp, heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const SubmitButton = ({ handleSubmit, isChecked, 
  isLogin, buttonShadow 
}) => {

  return (
      <PageMainButton 
          isChecked={ isChecked }
          isLogin={ isLogin } 
          style={ buttonShadow }
          onPress={ handleSubmit }
      >
          <AuthText role='#FFFFFF'>
              { isLogin ? 'Login' : 'Impact on future' }
          </AuthText>
      </PageMainButton>
  );
}

const PageMainButton = styled.TouchableOpacity`
    width: ${wp('70%')};    
    height: ${hp('5%')};
    display: ${ props => (!props.isLogin && !props.isChecked) ? 'none' : 'flex' };
    background-color: #00BFFF;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const AuthText = styled.Text`
    font-size: ${props => !props.role ? wp('5%') : wp('4%') };
    font-weight: 700;
    color: ${ props => !props.role ? '#483D8B' : props.role };
    text-transform: uppercase;
`;

export default SubmitButton;