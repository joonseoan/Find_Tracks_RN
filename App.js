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
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/contexts/authContext/authContext';
import { Provider as LocationProvider } from './src/contexts/locationContext/locationContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  PageLoading: LoadingScreen, 
  authFlow: createStackNavigator({
    // First Page
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
    <LocationProvider>
      <AuthProvider>
        <ApolloProvider client={ client }>
          <NavigationContainer>
            <Stack ref={ navigator => setNavigator(navigator) }/>
          </NavigationContainer>
        </ApolloProvider>
      </AuthProvider>
    </LocationProvider>
  );
}

export default NavRouter;