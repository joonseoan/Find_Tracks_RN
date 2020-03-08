import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, YellowBox } from 'react-native';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } 
 from 'react-native-responsive-screen';



import useBirthdayCheck from './src/hooks/stateManager/useBirthDayCheck';

export default () => {
  
  const { 
    birthday, 
    handleBirthday,
    years,
    months,
    days,
    monthLastIndex,
    dayLastIndex
  } = useBirthdayCheck();

  console.log(monthLastIndex)
  console.log(dayLastIndex)
  
  return (
    <Container style={ styles.shadowContainer }>
      <BirthDayDisplay>
        <BirthDayDisplayText>{ `${ birthday.month } ${ birthday.day }, ${ birthday.year }` }</BirthDayDisplayText>
      </BirthDayDisplay>
      <BirthDaySelect>
        <MonthAndDay>
            <MonthGroup>
              <Title>
                  <TitleText>Months</TitleText>
              </Title>
              <MonthsDisplay>
              {
                months.map((month, index) => (
                  <TouchableOpacity 
                     key={ index } 
                     disabled={ index > monthLastIndex ? true : false }
                     onPress={ () => handleBirthday({ name: 'month', value: month }) }
                  >
                    <MonthList
                      isDeactivated = { index > monthLastIndex }
                      style={  index > monthLastIndex ? undefined : styles.shadow } 
                    > 
                      <ButtonText
                        isDeactivated = { index > monthLastIndex }
                      >
                        { month }
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
                showsVerticalScrollIndicator={ false }
                data={ days }
                keyExtractor={ days => days.toString() }
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                      onPress={ () => handleBirthday({ name: 'day', value: item }) }
                      disabled={ index > dayLastIndex && true }
                    >
                        <DayList isDeactivated={ index > dayLastIndex } 
                                 style={ index > dayLastIndex ? undefined : styles.shadow }
                        >
                          <ButtonText isDeactivated={ index > dayLastIndex } >{ item.toString() }</ButtonText>
                        </DayList>
                    </TouchableOpacity>
                )}
              />
            </DaysVertical>
         </MonthAndDay>

         <YearsGroup>
            <Title isDayOrYear="years">
             <TitleText>Years</TitleText>
            </Title>
            <FlatList 
               horizontal
               showsHorizontalScrollIndicator={ false }
               data={ years }
               keyExtractor={ years =>  years.toString() }
               renderItem={({ item }) => (
                   <TouchableOpacity onPress={ () => handleBirthday({ name: 'year', value: item }) }>
                      <YearList style={ styles.shadow }>
                         <ButtonText>{ item.toString() }</ButtonText>
                      </YearList>
                   </TouchableOpacity>
               )}
            />
         </YearsGroup>         
      </BirthDaySelect>
      <BirthDayConfirm>


      </BirthDayConfirm>
    </Container>
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
  height: ${hp('60%')};
  width: ${wp('80%')};
  margin-top: 30px;
  background-color: #FFFFFF;
  align-self: center;
  
  display: flex;
  align-items: center;
`;

const BirthDayDisplay = styled.View`
  height: ${hp('15%')};
  width: ${wp('80%')};
  border-width: 2px;
  border-color: violet;
  
  align-items: center;
  justify-content: center;
`;

const BirthDayDisplayText = styled.Text`
  font-size: ${wp('4.5%')};
  font-weight: 700;
`;

const BirthDaySelect = styled.View`
  height: ${hp('35%')};
  width: ${wp('80%')};
  
`;

const MonthAndDay = styled.View`
  height: ${hp('28%')};
  width: ${wp('80%')}; 

  display: flex;
  flex-direction: row;
  justify-content: center;
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
  align-self: stretch;

  align-items: center;
  margin-bottom: 5px;
`;

const TitleText = styled.Text`
    color: #FFFFFF;
    font-weight: 700;
    text-transform: uppercase;
`;

const MonthGroup = styled.View`
  height: ${hp('27%')}   
  width: ${wp('65%')};
`;

const MonthsDisplay = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
  align-items: center;
    
`;

const MonthList = styled.View`
  height:${hp('5.5%')};
  width: ${wp('20%')}; 
  background-color: #FFFFFF;
  border-radius: ${ props => props.isDeactivated ? 0 : '10px' } 
  margin-bottom: 2.5px;

  align-items: center;
  justify-content: center;
`;

const DayList = styled.View`
  height:${hp('4.5%')};
  width: ${wp('9%')}; 
  background-color: #FFFFFF;
  margin-bottom: 3px;
  border-radius: ${ props => props.isDeactivated ? 0 : '20px' };

  align-items: center;
  justify-content: center;
`;

const YearList = styled.View`
  height:${hp('6%')};
  width: ${wp('12%')};

  background-color: #FFFFFF;
  border-radius: 15px;
  margin-right: 5px; 
  margin-bottom: 5px;

  align-items: center;
  justify-content: center;

`;

const ButtonText = styled.Text`
  color: ${ props => props.isDeactivated ? '#D3D3D3' : '#000000' } 
  font-weight: 500;
`;

const DaysVertical = styled.View`
  height: ${hp('28%')};  
  flex: 1;

  align-items: center;
`;

const YearsGroup = styled.View`
  height: ${hp('25%')}; 
  width: ${wp('80%')};

`;

const BirthDayConfirm = styled.View`
  flex: 1;  
  width: ${wp('80%')};

  margin-top: 20px;
  border-width: 2px;
  border-color: green;
`;