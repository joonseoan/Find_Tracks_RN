import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, YellowBox } from 'react-native';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } 
 from 'react-native-responsive-screen';

let days = [];
let months = [];
let years = [];

for(let i = 1; i <= 31; i++) {
  days.push(i);
}

for(let i = 2004; i <= 2020; i++ ){
  years.push(i);
}
 
export default () => {
  return (
    <Container>
      <BirthDayDisplay>

      </BirthDayDisplay>
      <BirthDaySelect>
        <MonthAndDay>
            <MonthGroup>
            </MonthGroup>
            <DaysVertical>
              <FlatList 
                showsVerticalScrollIndicator={ false }
                data={ days }
                keyExtractor={ days => days.toString() }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={ () => console.log(item) }>
                        <View><Text>{ item.toString() }</Text></View>
                    </TouchableOpacity>
                )}
              />
            </DaysVertical>
         </MonthAndDay>

         <YearsGroup>
            <FlatList 
               horizontal
               showsHorizontalScrollIndicator={ false }
               data={ years }
               keyExtractor={ years =>  years.toString() }
               renderItem={({ item }) => (
                   // item has the "id" field for each restaurant's menu
                   // { id: item.id } ===> setup param value
                   <TouchableOpacity onPress={ () => console.log(item) }>
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

const YearsGroup = styled.View`
  flex: 1;
  width: ${wp('80%')};
  border-width: 2px;
  border-color: orange;
`;

const MonthGroup = styled.View`
  height: ${hp('28%')};  
  width: ${wp('65%')};
  border-width: 2px;
  border-color: blue;
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