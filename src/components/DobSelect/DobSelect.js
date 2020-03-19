import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import styled from 'styled-components';

import { MidSizeModal } from '../common';
import dobSelect from '../../hooks/stateManager/dob/useBirthDayCheck';
import DobYears from './DobYears';
import DobMonths from './DobMonths';
import DobDays from './DobDays';

const DobSelect = ({ 
  modalState, setModalState, 
  userInputs, setUserInputs 
}) => {

  const {
    DobAailableCheck,
    birthday,
    handleBirthday,
    years,
    months,
    days,
    monthLastIndex,
    dayLastIndex,
  } = dobSelect();

  return (
    <MidSizeModal
      modalState={ modalState }
      setModalState={ setModalState }
    >
      <Container style={ styles.shadowContainer }>
        <BirthDayDisplay>
          <BirthDayDisplayText>
            { `${birthday.month} ${birthday.day}, ${birthday.year}` }
          </BirthDayDisplayText>
        </BirthDayDisplay>
        <BirthDaySelect>
          <DobYears 
            years={ years }
            handleBirthday={ handleBirthday }
          />          
          <MonthAndDay>
            <DobMonths
              months={ months }
              handleBirthday={ handleBirthday }
              monthLastIndex={ monthLastIndex }
            />
            <DobDays 
              days={ days }
              handleBirthday={ handleBirthday }
              dayLastIndex={ dayLastIndex }
            />                        
          </MonthAndDay>
        </BirthDaySelect>
        <BirthDayConfirm>
          { DobAailableCheck(
            userInputs, setUserInputs, 
            setModalState, modalState
          )}
        </BirthDayConfirm>
      </Container>
    </MidSizeModal>
  )
}

export default DobSelect;

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
  },
  shadowContainer: {
    shadowColor: '#000000',
    shadowOffset: {
        width: 5,
        height: 3,
    },
    shadowOpacity: 8,
    shadowRadius: 10,
    elevation: 15,
  }
});

const Container = styled.View`
  background-color: #FFFFFF;
  height: 100%;
  width: 100%;
  padding-vertical: 5%;
  
  border-radius: 20px;
  align-self: center;
  
  align-items: center;
  justify-content: space-between;
`;

// height: 5%;
const BirthDayDisplay = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const BirthDayDisplayText = styled.Text`
  font-size: 27px;
  font-weight: 700;
`;

const BirthDaySelect = styled.View`
  height: 68%;
  width: 95%;

  align-items: center;
`;

const Title = styled.View`
  background-color: ${ props => {
    if(props.isDayOrYear === "days") {
      return '#5B8930';
    }
    if(props.isDayOrYear === "years") {
      return "#FFDC00"
    }
    return '#35B3FF';
  }};
  
  margin-bottom: 2%;
  align-self: stretch;

  align-items: center;
`;

const TitleText = styled.Text`
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
`;

const MonthAndDay = styled.View`
  height: 70%;
  width: 100%; 

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BirthDayConfirm = styled.View`
  flex: 1;
  width: 77%;
  margin-top: 5%;
  
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${ props => props.isDeactivated ? '#D3D3D3' : '#000000' } 
  font-weight: 500;
`;