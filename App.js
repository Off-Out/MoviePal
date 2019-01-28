import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  ProfileScreen,
  HomeScreen,
  MapScreen,
  ChatScreen,
  LoginScreen,
  SingleTheaterScreen,
  FilterScreen,
  ListScreen,
} from './src/screen/index';

const MapStackNavigator = createStackNavigator({
  Main: MapScreen,
  Filter: FilterScreen,
  SingleTheater: SingleTheaterScreen,
  ListScreen: ListScreen,
});

const TabNavigator = createBottomTabNavigator({
  Profile: ProfileScreen,
  Home: HomeScreen,
  Map: MapStackNavigator,
  Chat: ChatScreen,
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
    LoginScreen: { screen: LoginScreen },
  },
  { initialRouteName: 'LoginScreen' }
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,

    App: TabComponents,
  })
);

export default class Application extends React.Component {
  render() {
    return <AppContainer />;
  }
}
