import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components';

const DobDays = ({ days, handleBirthday, dayLastIndex }) => {
  return(
    <DaysVertical>
      <Title isDayOrYear="days" >
        <TitleText>Days</TitleText>
      </Title>
      <FlatList
        showsVerticalScrollIndicator={ false }
        data={ days }
        keyExtractor={ days => days.toString() }
        renderItem={ ({ item, index }) => (
          <ButtonWrap
            width="40"
            height="35"
            margin="5%"
            onPress={() => {
              handleBirthday({ name: 'day', value: item })
              // authInputOnChange({ name: 'dob', value: `${ birthday.month } ${ item }, ${ birthday.year }` })
            }}
            disabled={ index > dayLastIndex && true }
          >
            <DayList isDeactivated={ index > dayLastIndex }
              style={ index > dayLastIndex ? undefined : styles.shadow }
            >
              <ButtonText 
                isDeactivated={ index > dayLastIndex }
              >
                { item.toString() }
              </ButtonText>
            </DayList>
          </ButtonWrap>
        )}
      />
    </DaysVertical>
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

const DaysVertical = styled.View`  
  width: 100;
  flex: 1;
  align-items: center;
`;

const ButtonWrap = styled.TouchableOpacity`
  width: ${ props => props.width };
  height: ${ props =>  props.height };
  align-items: center;
  margin: ${ props =>  props.margin };
`; 

const DayList = styled.View`
  background-color: #FFFFFF;
  height: 100%;
  width: 95%; 
  border-radius: ${ props => props.isDeactivated ? 0 : '30px' };
  
  align-items: center;
  justify-content: center;
`;

const Title = styled.View`
  background-color: #5B8930;
  margin-bottom: 2%;
  align-self: stretch;

  align-items: center;
`;

const TitleText = styled.Text`
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
`;

// const ButtonWrap = styled.TouchableOpacity`
//   width: ${ props => props.width };
//   height: ${ props =>  props.height };
//   align-items: center;
//   margin: ${ props =>  props.margin };
// `; 

const ButtonText = styled.Text`
  color: ${ props => props.isDeactivated ? '#D3D3D3' : '#000000' };
  font-weight: 500;
`;

export default DobDays;