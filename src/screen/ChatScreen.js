import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase';
import ChatBackEnd from '../component/ChatBackEnd';
import ChatNavBar from '../component/ChatNavBar';


export default ChatContainers = (props) => {
  // const movieInfo = this.props.navigation.getParam('movieInfo');
  // const chatId = movieInfoToChatId(movieInfo);
  return <ChatScreen
  // movieInfo={movieInfo}
  />
}


export class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      messages: [],
      appIsReady: false,
      people: 0,
    };
  }

  render() {
    // const movieInfo = this.props.navigation.getParam('movieInfo');
    const movieInfo = this.props.movieInfo;
    if (!this.state.chatId) {
      Alert.alert("Please join an movie to enter the movie's chatroom!");
      this.props.navigation.navigate('Map');
      return null;
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

  async componentDidMount() {
    const chatId = await ChatBackEnd.getChatId()
    chatId ? this.setState({chatId}) : null
    await ChatBackEnd.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
    await database.ref(`/chatroom/${today}/${this.state.chatId}/users`).on('value', snapshot => {
      if (snapshot.exists()) {
        let users = Object.keys(snapshot.val());
        this.setState({people: users.length})
      }
    })
  }

  componentWillUnmount() {
    // unsubscribe - cleanup
    ChatBackEnd.closeChat();
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevProps.chatId !== this.props.chatId) {
      await this.setState({messages: []})
      await ChatBackEnd.loadMessages(message => {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
      });
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
