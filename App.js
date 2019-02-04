import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  AuthLoadingScreen,
  ProfileScreen,
  HistoryScreen,
  MovieScreen,
  MapScreen,
  ChatScreen,
  LoginScreen,
  SignUpScreen,
  SingleTheaterScreen,
  ListScreen,
  TriviaQuestions,
  SingleMovie,
} from './src/screen/index';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from './src/redux/app-redux';

const MapStackNavigator = createStackNavigator({
  Main: MapScreen,
  SingleTheater: SingleTheaterScreen,
  SingleMovie: SingleMovie,
  ListScreen: ListScreen,
  // Trivia: TriviaQuestions
});

const ProfileStackNavigator = createStackNavigator({
  History: HistoryScreen,
  Profile: ProfileScreen,
});

const TabNavigator = createBottomTabNavigator({
  Movie: {
    screen: MovieScreen,
    navigationOptions: {
      tabBarLabel: 'MOVIES',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-play" color={tintColor} size={24} />
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
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      tabBarLabel: 'HISTORY',
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
      tabBarLabel: 'TRIVIA',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-trophy" color={tintColor} size={24} />
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

const AuthStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  { initialRouteName: 'LoginScreen' }
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
  createSwitchNavigator(
    {
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen,
      App: TabComponents,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
