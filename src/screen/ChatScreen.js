import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase';
import ChatBackEnd from '../component/ChatBackEnd';
import ChatNavBar from '../component/ChatNavBar';
import Stor from '../store/Stor';

export default class ChatScreen extends Component {
  
  constructor(props) {
    super(props);
    
    // Stor('chatroom').then(result => console.log("store", result))

    this.state = {
      messages: [],
      appIsReady: false,
    };
  }

  render () {

    if (false) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Please join an event to enter the event's chatroom!</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {/* <ChatNavBar /> */}
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
