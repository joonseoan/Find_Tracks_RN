import React from 'react';
import styled from 'styled-components';
import { 
  widthPercentageToDP as wp, heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const AuthInputs = ({ 
  authInputList, 
  formikProps, 
  inputElements,
  userInputs,
  setUserInputs 
}) => {

  const { values, touched, errors } = formikProps;
  
  return authInputList().map((input, index) => {
      return ( 
          <InputGroup key={ index } isCheckBox={ input.name }>     
              <InputLabel isCheckBox = { input.name }>
                  { input.label }
              </InputLabel>
              {
                  inputElements(
                    formikProps, input, 
                    userInputs, setUserInputs
                  )
              }
              {
                  (touched[input.name] && errors[input.name]) && (
                      <ValidationError isCheckBox={ input.name }>
                          { errors[input.name] }
                      </ValidationError>
                  )
              }
          </InputGroup>
      )
  });
}

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


export default AuthInputs;