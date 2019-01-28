import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
// Sentry is a crash reporting and aggregation platform that provides you with "real-time insight into production deployments with info to reproduce and fix crashes"
// import Sentry from 'sentry-expo';
import LoginScreen from './LoginScreen';
import NavBar from '../component/NavBar'

const messagesData = [
{
  _id: Math.round(Math.random() * 1000000),
  text: '#awesome',
  createdAt: new Date(),
  user: {
    _id: 1,
    name: 'Developer',
  },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: '',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: require('../../assets/avatar.png'),
  },
  image: 'https://lh3.googleusercontent.com/-uXipYA5hSKc/VVWKiFIvo-I/AAAAAAAAAhQ/vkjLyZNEzUA/w800-h800/1.jpg',
  sent: true,
  received: true,
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'Send me a picture!',
  createdAt: new Date(),
  user: {
    _id: 1,
    name: 'Developer',
  },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: '',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: require('../../assets/avatar.png'),
  },
  sent: true,
  received: true,
  location: {
    latitude: 48.864601,
    longitude: 2.398704,
  },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'Where are you?',
  createdAt: new Date(),
  user: {
    _id: 1,
    name: 'Developer',
  },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'Yes, and I use #GiftedChat!',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: require('../../assets/avatar.png'),
  },
  sent: true,
  received: true,
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'Are you building a chat app?',
  createdAt: new Date(),
  user: {
    _id: 1,
    name: 'Developer',
  },
},
{
  _id: Math.round(Math.random() * 1000000),
  text: 'You are officially rocking GiftedChat.',
  createdAt: new Date(),
  system: true,
},
];

const filterBotMessages = (message) => !message.system && message.user && message.user._id && message.user._id === 2;

const findStep = (step) => (_, index) => index === step - 1;

export default class ChatScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      step: 0,
      appIsReady: false,
    }
  }

    onSend = (messages = []) => {
      const step = this.state.step + 1;
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [{ ...messages[0], sent: true, received: true }]),
        step,
      }));
      setTimeout(() => this.botSend(step), 1200 + Math.round(Math.random() * 1000));
    }

    botSend(step = 0) {
      const newMessage = messagesData
        .reverse()
        .filter(filterBotMessages)
        .find(findStep(step));
      if (newMessage) {
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, newMessage),
        }));
      }
    }

    parsePatterns = (linkStyle) => {
      return [
        {
          pattern: /#(\w+)/,
          style: { ...linkStyle, color: 'darkorange' },
          onPress: () => Linking.openURL('http://gifted.chat'),
        },
      ];
    }

    async componentWillMount() {
      // init with only system messages
      await Asset.fromModule(require('../../assets/avatar.png')).downloadAsync();
      this.setState({ messages: messagesData.filter((message) => message.system), appIsReady: true });
    }

    render() {
    if (!this.state.appIsReady) {
      return <LoginScreen />;
    }
    return (
      <View style={styles.container} accessible accessibilityLabel="main" testID="main">
        <NavBar />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          keyboardShouldPersistTaps="never"
          user={{
            _id: 1,
          }}
          parsePatterns={this.parsePatterns}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: { flex: 1 },
});