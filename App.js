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
  
  return (
    <Container>
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
                months.map(month => (
                  <TouchableOpacity key={ month } onPress={ () => handleBirthday({ name: 'month', value: month }) }>
                    <MonthList>
                      
                      <Text>{ month }</Text>
                    </MonthList>
                  </TouchableOpacity>
                ))
              }
              </MonthsDisplay>
                    
            </MonthGroup>
            <DaysVertical>
              <View>
                <Text>Days</Text>
              </View>
              <FlatList 
                showsVerticalScrollIndicator={ false }
                data={ days }
                keyExtractor={ days => days.toString() }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={ () => handleBirthday({ name: 'day', value: item }) }>
                        <View><Text>{ item.toString() }</Text></View>
                    </TouchableOpacity>
                )}
              />
            </DaysVertical>
         </MonthAndDay>

         <YearsGroup>
           <View><Text>Years</Text></View>
            <FlatList 
               horizontal
               showsHorizontalScrollIndicator={ false }
               data={ years }
               keyExtractor={ years =>  years.toString() }
               renderItem={({ item }) => (
                   <TouchableOpacity onPress={ () => handleBirthday({ name: 'year', value: item }) }>
                       <View><Text>{ item.toString() }</Text></View>
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

const Container = styled.View`
  height: ${hp('60%')};
  width: ${wp('80%')};
  margin-top: 30px;
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
  border-width: 2px;
  border-color: black;
  align-items: center;
`;

const MonthAndDay = styled.View`
  height: ${hp('28%')};
  width: ${wp('80%')};
  border-width: 2px;
  border-color: grey;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.View`
  background-color: grey;
  align-items: center;
  margin-bottom: 2.8px;
`;

const TitleText = styled.Text`
    color: blue;
`;

const MonthGroup = styled.View`
  height: ${hp('27%')}   
  width: ${wp('65%')};
  border-width: 2px;
  border-color: blue;

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
  border-width: 2px;
  border-color: red;
  border-radius: 10px;
  margin-bottom: 2.5px;

  align-items: center;
  justify-content: center;

`;

const YearsGroup = styled.View`
  flex: 1;
  width: ${wp('80%')};
  border-width: 2px;
  border-color: orange;
`;

const DaysVertical = styled.View`
  height: ${hp('28%')};  
  flex: 1;
  border-width: 2px;
  border-color: green;
`;

const BirthDayConfirm = styled.View`
  flex: 1;  
  width: ${wp('80%')};
  border-width: 2px;
  border-color: green;
`;























// import { ApolloProvider } from 'react-apollo';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { NavigationContainer } from '@react-navigation/native';

// import client from './src/graphql';
// import AccountScreen from './src/screens/AccountScreen';
// import SigninScreen from './src/screens/SigninScreen';
// import SignupScreen from './src/screens/SignupScreen';
// import TrackCreateScreen from './src/screens/TrackCreateScreen';
// import TrackDetailScreen from './src/screens/TrackDetailScreen';
// import TrackListScreen from './src/screens/TrackListScreen';

// const switchNavigator = createSwitchNavigator({

//   authFlow: createStackNavigator({
//     // First Page
//     Signup: SignupScreen,
//     Signin: SigninScreen
//   }),
//   mainFlow: createBottomTabNavigator({
//     // First Button at the BottomNavigation
//     trackListFlow: createStackNavigator({
//       // First Page
//       TrackList: TrackListScreen,
//       TrackDetail: TrackDetailScreen
//     }),
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen
//   })

// });

// const Stack = createAppContainer(switchNavigator);
// const NavRouter = () => {
//   return(
//     <ApolloProvider client={ client }>
//       <NavigationContainer>
//         <Stack />
//       </NavigationContainer>
//     </ApolloProvider>
//   );
// }

// export default NavRouter;