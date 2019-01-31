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
  SignUpScreen,
  SingleTheaterScreen,
  ListScreen,
  SingleMovie,
} from './src/screen/index';
import { Ionicons } from '@expo/vector-icons';

const MapStackNavigator = createStackNavigator({
  Main: MapScreen,
  SingleTheater: SingleTheaterScreen,
  SingleMovie: SingleMovie,
  ListScreen: ListScreen,
});

const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapStackNavigator,
    navigationOptions: {
      tabBarLabel: 'MAP',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-map" color={tintColor} size={24} />
      ),
    },
  },

  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" color={tintColor} size={24} />
      ),
    },
  },

  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarLabel: 'CHAT',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-chatbubbles" color={tintColor} size={24} />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-contact" color={tintColor} size={24} />
      ),
    },
  },
});

const AuthStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
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

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    App: TabComponents,
  })
);

export default AppContainer;
