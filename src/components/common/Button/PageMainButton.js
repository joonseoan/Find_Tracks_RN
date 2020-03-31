import React from 'react';
import styled from 'styled-components';
import { 
  widthPercentageToDP as wp, heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const PageMainButton = ({ handleSubmit, isChecked, 
  isLogin, buttonShadow, children 
}) => {

  return (
      <PageMainButtonTouchableOpacity 
          isChecked={ isChecked }
          isLogin={ isLogin } 
          style={ buttonShadow }
          onPress={ handleSubmit }
      >
        { children }
      </PageMainButtonTouchableOpacity>
  );
}

const PageMainButtonTouchableOpacity = styled.TouchableOpacity`
    width: ${ wp('70%') };    
    height: ${ hp('5%') };
    display: ${ props => (!props.isLogin && !props.isChecked) ? 'none' : 'flex' };
    background-color: #00BFFF;
    border-radius: 10px;
    align-items: center;
    justify-content: center;

`;
    
export { PageMainButton };
    // border-width: 10px;
    // border-color: blue;