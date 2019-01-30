import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase';
import ChatBackEnd from '../component/ChatBackEnd';
import LoginScreen from './LoginScreen';
import ChatNavBar from '../component/ChatNavBar';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      appIsReady: false,
    };
  }

  render () {
    const userId = this.props.screenProps;
    const movieInfo = this.props.navigation.getParam('movieInfo')
    const chatId = this.props.navigation.getParam('chatId')

    if (!chatId) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Please join an event to enter the event's chatroom!</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ChatNavBar movieInfo={movieInfo} />
          <GiftedChat
            messages={this.state.messages}
            onSend={message => {
              ChatBackEnd.sendMessage(message);
            }}
            user={{
              _id: ChatBackEnd.getUid(),
              name: ChatBackEnd.getName(),
              // avatar:
            }}
          />
        </View>
      );
    }
  }

  componentDidMount() {
    ChatBackEnd.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    ChatBackEnd.closeChat();
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
