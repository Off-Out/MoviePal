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
  FilterScreen,
  ListScreen,

  TriviaQuestions,
  SingleMovie,
} from './src/screen/index';
import { Ionicons } from '@expo/vector-icons';

const MapStackNavigator = createStackNavigator({
  Main: MapScreen,
  Filter: FilterScreen,
  SingleTheater: SingleTheaterScreen,
  SingleMovie: SingleMovie,
  ListScreen: ListScreen,
  TriviaQuestions: TriviaQuestions
});

const TabNavigator = createBottomTabNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-contact" color={tintColor} size={24} />
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
  Map: {
    screen: MapStackNavigator,
    navigationOptions: {
      tabBarLabel: 'MAP',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-map" color={tintColor} size={24} />
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
  Trivia: {
    screen: TriviaQuestions,
    navigationOptions: {
      tabBarLabel: 'GAME',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-game" color={tintColor} size={24} />
      ),
    },
  },
});

const AuthStack = createStackNavigator(
  // {
  //   LoginScreen: { screen: LoginScreen },
  //   SignUpScreen: { screen: SignUpScreen },
  // },
  // { initialRouteName: 'LoginScreen' }
  { MapScreen: { screen: MapScreen } },
  { initialRouteName: 'MapScreen' }
);

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
