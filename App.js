import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { NavigationContainer } from '@react-navigation/native';

import client from './src/graphql';
import LoadingScreen from './src/screens/LoadingScreen';
import AuthScreen from './src/screens/Auth/AuthScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/contexts/authContext/authContext';
import { Provider as LocationProvider } from './src/contexts/locationContext/locationContext';
import { Provider as TrackProvider } from './src/contexts/trackContext/trackContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  // First Page
  PageLoading: LoadingScreen,
  authFlow: createStackNavigator({
    Auth: AuthScreen,
  }),
  mainFlow: createBottomTabNavigator({
    // First Button at the BottomNavigation
    trackListFlow: createStackNavigator({
      // First Page
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
});

const Stack = createAppContainer(switchNavigator);

const NavRouter = () => {
  return(
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <ApolloProvider client={ client }>
            <NavigationContainer>
              <Stack ref={ navigator => {
                // [ All Navigation methods ] 
                // console.log('navigator: ====> ', navigator)
                return setNavigator(navigator) }}/>
            </NavigationContainer>
          </ApolloProvider>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}

export default NavRouter;