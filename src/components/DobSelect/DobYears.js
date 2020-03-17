import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';

const DobYears = ({ years, handleBirthday }) => {
  return(
    <YearsGroup>
        <Title>
          <TitleText>Years</TitleText>
        </Title>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={ false }
          data={ years }
          keyExtractor={ years => years.toString() }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              handleBirthday({ name: 'year', value: item });
              // authInputOnChange({ name: 'dob', value: `${ birthday.month } ${ birthday.day }, ${ item }` });
            }}>
              <YearList style={ styles.shadow }>
                <ButtonText>{ item.toString() }</ButtonText>
              </YearList>
            </TouchableOpacity>
          )}
        />
      </YearsGroup>
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

const YearsGroup = styled.View`
  height: 25%; 
  width: 100%;
  margin-vertical: 1%;

  align-items: center;
`;

const YearList = styled.View`
  background-color: #FFFFFF;
  height: 90%;
  width: 135%;
  padding-horizontal: 1%;
  border-radius: 30px;

  align-items: center;
  justify-content: center;
`;

const Title = styled.View`
  background-color: #FFDC00;
  margin-bottom: 2%;
  align-self: stretch;

  align-items: center;
`;

const TitleText = styled.Text`
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-weight: 500;
`;

export default DobYears;