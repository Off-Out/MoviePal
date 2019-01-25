import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  withNavigation,
} from 'react-navigation';
import {
  ProfileScreen,
  HomeScreen,
  MapScreen,
  ChatScreen,
  LoginScreen,
  AuthLoadingScreen,
} from './src/screen/index';

const TabNavigator = createBottomTabNavigator({
  Profile: ProfileScreen,
  Home: HomeScreen,
  Map: MapScreen,
  Chat: ChatScreen,
});

const AuthStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      // Home: ProfileScreen,
      // App: props => <TabNavigator screenProps={ props.navigation.getParam("userId")}/>
    }
    // {initialRouteName: 'Auth'}
  )
);
