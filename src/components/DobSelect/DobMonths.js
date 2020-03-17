import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';

const DobMonths = ({ months, handleBirthday, monthLastIndex }) => {
  return(
    <MonthGroup>
      <Title>
        <TitleText>Months</TitleText>
      </Title>
      <MonthsDisplay>
        {
          months.map((month, index) => (
            <ButtonWrap
              width="75"
              height="44"
              margin="1%"
              key={ index }
              disabled={ index > monthLastIndex ? true : false }
              onPress={() => {
                handleBirthday({ name: 'month', value: month });
                // authInputOnChange({ name: 'dob', value: `${ month } ${ birthday.day }, ${ birthday.year }` })
              }}
            >
              <MonthList
                isDeactivated={ index > monthLastIndex }
                style={index > monthLastIndex ? undefined : styles.shadow}
              >
                <ButtonText
                  isDeactivated={ index > monthLastIndex }
                >
                  { month }
                </ButtonText>
              </MonthList>
            </ButtonWrap>
          ))
        }
      </MonthsDisplay>
    </MonthGroup>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
        width: 5,
        height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 3,
  }
});

const MonthGroup = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
`;

const MonthsDisplay = styled.View`
  flex: 1;
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
`;

const MonthList = styled.View`
  background-color: #FFFFFF;
  height: 100%;
  width: 65%; 
  border-radius: ${ props => props.isDeactivated ? 0 : '40px' } 

  align-items: center;
  justify-content: center;
`;

const Title = styled.View`
  background-color: #35B3FF;
  margin-bottom: 2%;
  align-self: stretch;

  align-items: center;
`;

const TitleText = styled.Text`
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
`;

const ButtonWrap = styled.TouchableOpacity`
  width: ${ props => props.width };
  height: ${ props =>  props.height };
  align-items: center;
  margin: ${ props =>  props.margin };
`; 

const ButtonText = styled.Text`
  color: ${ props => props.isDeactivated ? '#D3D3D3' : '#000000' };
  font-weight: 500;
`;

export default DobMonths;