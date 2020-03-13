import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

import { MidSizeModal } from '../common/Modal/MidSizeModal';
import useBirthDayCheck from '../../hooks/stateManager/dob/useBirthDayCheck';

const DobSelect = ({ modalState, setModalState
                    // setAuthUser 
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
  } = useBirthDayCheck();

  return (
    <MidSizeModal
      modalState={modalState}
      setModalState={setModalState}
    >
      <Container style={styles.shadowContainer}>
        <BirthDayDisplay>
          <BirthDayDisplayText>
            {`${birthday.month} ${birthday.day}, ${birthday.year}`}
          </BirthDayDisplayText>
        </BirthDayDisplay>
        <BirthDaySelect>
          <YearsGroup>
            <Title isDayOrYear="years">
              <TitleText>Years</TitleText>
            </Title>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={years}
              keyExtractor={years => years.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  handleBirthday({ name: 'year', value: item });
                  // setAuthUser({ name: 'dob', value: `${ birthday.month } ${ birthday.day }, ${ item }` });
                }}>
                  <YearList style={styles.shadow}>
                    <ButtonText>{item.toString()}</ButtonText>
                  </YearList>
                </TouchableOpacity>
              )}
            />
          </YearsGroup>
          <MonthAndDay>
            <MonthGroup>
              <Title>
                <TitleText>Months</TitleText>
              </Title>
              <MonthsDisplay>
                {
                  months.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      disabled={index > monthLastIndex ? true : false}
                      onPress={() => {
                        handleBirthday({ name: 'month', value: month });
                        // setAuthUser({ name: 'dob', value: `${ month } ${ birthday.day }, ${ birthday.year }` })
                      }}
                    >
                      <MonthList
                        isDeactivated={ index > monthLastIndex }
                        style={index > monthLastIndex ? undefined : styles.shadow}
                      >
                        <ButtonText
                          isDeactivated={ index > monthLastIndex }
                        >
                          {month}
                        </ButtonText>
                      </MonthList>
                    </TouchableOpacity>
                  ))
                }
              </MonthsDisplay>
            </MonthGroup>
            <DaysVertical>
              <Title isDayOrYear="days" >
                <TitleText>Days</TitleText>
              </Title>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={days}
                keyExtractor={days => days.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleBirthday({ name: 'day', value: item })
                      // setAuthUser({ name: 'dob', value: `${ birthday.month } ${ item }, ${ birthday.year }` })
                    }}
                    disabled={
                      index > dayLastIndex && true
                    }
                  >
                    <DayList isDeactivated={index > dayLastIndex}
                      style={index > dayLastIndex ? undefined : styles.shadow}
                    >
                      <ButtonText isDeactivated={index > dayLastIndex} >{item.toString()}</ButtonText>
                    </DayList>
                  </TouchableOpacity>
                )}
              />
            </DaysVertical>
          </MonthAndDay>
        </BirthDaySelect>
        <BirthDayConfirm>
           { 
          //  DobAailableCheck(setAuthUser, setModalState, modalState)
              DobAailableCheck(setModalState, modalState)
           
           }
        </BirthDayConfirm>
      </Container>
    </MidSizeModal>
  )
}

export default DobSelect;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'red',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 3,
  },
  shadowContainer: {
    shadowColor: 'red',
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
  height: ${hp('65%')};
  width: ${wp('80%')};

  margin-top: 30px;
  border-radius: 20px;
  background-color: #FFFFFF;
  align-self: center;
  
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const BirthDayDisplay = styled.View`    
    width: ${wp('80%')};

    align-items: center;
    justify-content: flex-start;
`;

const BirthDayDisplayText = styled.Text`
  font-size: 30px;
  font-weight: 700;
`;

const BirthDaySelect = styled.View`
  height: ${hp('38%')};
  width: ${wp('80%')};
`;

const YearsGroup = styled.View`
  height: ${hp('10%')}; 
  width: ${wp('80%')};
  align-items: center;
`;

const YearList = styled.View`
  height:${hp('6%')};
  width: ${wp('12%')};
  margin-horizontal: ${wp('1%')};
  background-color: #FFFFFF;
  border-radius: 30px;
 
  align-items: center;
  justify-content: center;
`;

const Title = styled.View`
  background-color: ${ props => {
    if (props.isDayOrYear === "days") {
      return '#5B8930';
    }
    if (props.isDayOrYear === "years") {
      return "#FFDC00"
    }
    return '#35B3FF';
  }};
  align-self: stretch;

  align-items: center;
  margin-bottom: 5px;
`;

const TitleText = styled.Text`
    color: #FFFFFF;
    font-weight: 700;
    text-transform: uppercase;
`;

const MonthAndDay = styled.View`
  height: ${hp('28%')};
  width: ${wp('80%')}; 

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MonthGroup = styled.View`
  height: ${hp('27%')}   
  width: ${wp('65%')};
  align-items: center;
`;

const MonthsDisplay = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const MonthList = styled.View`
  height:${hp('5.5%')};
  width: ${wp('20%')}; 
  background-color: #FFFFFF;
  border-radius: ${ props => props.isDeactivated ? 0 : '50px'} 
  align-items: center;
  justify-content: center;
`;

const DaysVertical = styled.View`
  height: ${hp('28%')};  
  flex: 1;

  align-items: center;
`;

const DayList = styled.View`
  height:${hp('4.5%')};
  width: ${wp('9%')}; 
  background-color: #FFFFFF;
  margin-vertical: 10%;
  border-radius: ${ props => props.isDeactivated ? 0 : '20px'};

  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${ props => props.isDeactivated ? '#D3D3D3' : 'red'} 
  font-weight: 500;
`;

const BirthDayConfirm = styled.View`
   height: ${hp('10%')};
   width: ${wp('60%')};  
   align-items: center;
   justify-content: flex-start;
`;