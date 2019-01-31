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
  HomeScreen,
  MapScreen,
  ChatScreen,
  LoginScreen,
  SignUpScreen,
  SingleTheaterScreen,
  SingleEvent,
  FilterScreen,
  ListScreen,
  SingleMovie,
} from './src/screen/index';
import { auth, database } from './src/firebase';
import { Text } from 'native-base';
import IconBadge from 'react-native-icon-badge';
import { Ionicons } from '@expo/vector-icons';
import { SecureStore } from 'expo';

const MapStackNavigator = createStackNavigator({
  Main: MapScreen,
  SingleTheater: SingleTheaterScreen,
  SingleMovie: SingleMovie,
  ListScreen: ListScreen,
});

const ProfileStackNavigator = createStackNavigator({
  Profile: ProfileScreen,
  History: HistoryScreen,
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

  // Home: {
  //   screen: HomeScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'HOME',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Ionicons name="ios-home" color={tintColor} size={24} />
  //     ),
  //   },
  // },

  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarLabel: 'CHAT',
      tabBarIcon: ({ tintColor }) => (
        // <IconBadge
        //   MainElement = {
        <Ionicons name="ios-chatbubbles" color={tintColor} size={24} />
        // }
        // BadgeElement={<Text style={{ color: 'white' }}>{screenProps.unreadMessagesCount}</Text>}
        // Hidden={screenProps.unreadMessagesCount === 0}
        // />
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
      AuthLoading: AuthLoadingScreen,
      App: TabComponents,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default class Application extends React.Component {
  // async componentDidMount() {
  //   // await database.ref('chatroom').once('value', snapshot => {
  //   //   if (snapshot.exists() && snapshot.val()[0] !== new Date(2018, 0, 31).toDateString()) {
  //   //     database.ref('chatroom').remove()
  //   //   } else console.log('enter!')
  //   // })
  //   await database.ref('chatroom').on('value', snapshot => {
  //     // if (snapshot.exists() && snapshot.val()[0] !== new Date().toDateString()) {
  //       console.log("WHAT????", snapshot.val()[0] )
  //   //     database.ref('chatroom').remove()
  //   //   } else console.log('Welcome to MoviePal!')
  //   });
  // }

  componentDidMount() {}

  render() {
    return <AppContainer />;
  }
}
