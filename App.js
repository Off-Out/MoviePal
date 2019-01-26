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
  SignUpScreen,
  AuthLoadingScreen,
  SingleEvent,
} from './src/screen/index';

const TabNavigator = createBottomTabNavigator({
  Profile: ProfileScreen,
  Home: HomeScreen,
  Map: MapScreen,
  Chat: ChatScreen,
  Single: SingleEvent,
});

class TabComponents extends React.Component {
  static router = TabNavigator.router;
  render() {
    return (
      <TabNavigator
        navigation={this.props.navigation}
        screenProps={this.props.navigation.getParam('userId')}
      />
    );
  }
}

const AuthStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
  },
  { initialRouteName: 'HomeScreen' }
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen,
    App: TabComponents,
  })
);

export default class Application extends React.Component {
  render() {
    return <AppContainer />;
  }
}
