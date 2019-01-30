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
  SingleEvent,
  FilterScreen,
  ListScreen,

} from './src/screen/index';
import { auth, database } from './src/firebase'
import { Text } from 'native-base'
import IconBadge from 'react-native-icon-badge';
import { Ionicons } from '@expo/vector-icons';

const MapStackNavigator = createStackNavigator({
  Main: MapScreen,
  Filter: FilterScreen,
  SingleTheater: SingleTheaterScreen,
  ListScreen: ListScreen,
  SingleEvent: SingleEvent
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
});

const AuthStack = createStackNavigator(

  {
    LoginScreen: { screen: LoginScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  { initialRouteName: 'LoginScreen' }
  // { SingleEvent: { screen: SingleEvent } },
  // { initialRouteName: 'SingleEvent' }
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


export default class Application extends React.Component {

  async componentDidMount() {
    // await database.ref('chatroom').once('value', snapshot => {
    //   if (snapshot.exists() && snapshot.val()[0] !== new Date(2018, 0, 31).toDateString()) {
    //     database.ref('chatroom').remove()
    //   } else console.log('enter!')
    // })
    await database.ref('chatroom').once('value', snapshot => {
      if (snapshot.exists() && snapshot.val()[0] !== new Date().toDateString()) {
        database.ref('chatroom').remove()
      } else console.log('Welcome to MoviePal!')
    })
  }

  render() {
    return (
      <AppContainer />
    )
  }
}
