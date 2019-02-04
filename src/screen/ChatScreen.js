import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase';
import ChatBackEnd from '../component/ChatBackEnd';
import ChatNavBar from '../component/ChatNavBar';


export default function ChatContainers (props) {
  const movieInfo = this.props.navigation.getParam('movieInfo');
  // const chatId = movieInfoToChatId(movieInfo);
  return <ChatScreen movieInfo={movieInfo}/>
}


export class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      appIsReady: false,
    };
  }

  render() {
    // const movieInfo = this.props.navigation.getParam('movieInfo');
    const movieInfo = this.props.movieInfo
    if (!movieInfo) {
      Alert.alert("Please join an event to enter the event's chatroom!");
      this.props.navigation.navigate('Map');
      return null;
    // } else if (!this.state.messages.length) {
    //   return <View />;
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
    // unsubscribe - cleanup
    ChatBackEnd.closeChat();
  }

  // componentDidUpdate (prevProps, prevState) {
  //   if (prevPRops.roomId !== this.props.rommId) {
  //     // cleanup currentfirebase stuff
  //     // set up new firebase stuff
  //   }
  // }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
