import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Alert } from 'react-native';
import { Badge } from 'native-base'
import { LinearGradient } from 'expo';
import { Divider } from 'react-native-paper';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase';
import ChatBackEnd from '../component/ChatBackEnd';
import ChatNavBar from '../component/ChatNavBar';


// export default function ChatContainers (props) {
//   const movieInfo = this.props.navigation.getParam('movieInfo');
//   // const chatId = movieInfoToChatId(movieInfo);
//   return <ChatScreen movieInfo={movieInfo}/>
// }


export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: ChatBackEnd.getChatId() || '',
      title: '',
      movieTime: '',
      theater: '',
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
      this.props.navigation.navigate('Profile');
      return null;
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <LinearGradient colors={[('ff0100', 'cc0d0c', 0, 0)]} style={{}} />
          <View style={{display: "flex", flexDirection:"row", justifyContent:"center"}}>
          <Text style={styles.screenHeader}>💬CHAT</Text>
          <Badge warning style={{marginTop: 9}}><Text style={{color: "white", fontSize: 12}}>{this.state.people} Pals</Text></Badge>
          </View>
          <Text style={{ fontSize: 13, color:"gray", marginBottom: 5, textAlign: "center" }}>{` "${this.state.title}" \n @ ${this.state.theater}, ${this.state.movieTime} Today`}</Text>
          <Divider />

          <GiftedChat
            messages={this.state.messages}
            onSend={message => {
              ChatBackEnd.sendMessage(message);
            }}
            user={{
              _id: ChatBackEnd.getUid(),
              name: ChatBackEnd.getName(),
            }}
          />

        </View>
        </SafeAreaView>
      );
    }
  }

  async componentDidMount() {
    const today = new Date().toDateString();
    console.log("WHAT IS MY CHATID", this.state.chatId)
    await ChatBackEnd.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
    // await database.ref(`/chatroom/${today}/${this.state.chatId}`).on('value', snapshot => {
    await database.ref(`/chatroom/Mon Feb 04 2019/${this.state.chatId}`).on('value', snapshot => {
      if (snapshot.exists()) {
        let users = Object.keys(snapshot.val().users);
        this.setState({
          title: snapshot.val().movie,
          movieTime: snapshot.val().selectedTime,
          theater: snapshot.val().theater,
          people: users.length,
        });
      }
    })
  }

  componentWillUnmount() {
    // unsubscribe - cleanup
    ChatBackEnd.closeChat();
  }

  // async componentDidUpdate (prevProps, prevState) {
  //   if (prevState.chatId !== this.state.chatId) {
  //     await this.setState({messages: []})
  //     await ChatBackEnd.loadMessages(message => {
  //       this.setState(previousState => {
  //         return {
  //           messages: GiftedChat.append(previousState.messages, message),
  //         };
  //       });
  //     });
  //     await database.ref(`/chatroom/${today}/${this.state.chatId}`).on('value', snapshot => {
  //       if (snapshot.exists()) {
  //         let users = Object.keys(snapshot.val().users);
  //         this.setState({
  //           title: snapshot.val().movie,
  //           movieTime: snapshot.val().selectedTime,
  //           theater: snapshot.val().theater,
  //           people: users.length,
  //         });
  //       }
  //     })
  //   }
  // }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 5, },
  screenHeader: {
    fontSize: 28,
    margin: 5,
    letterSpacing: 5,
    color: '#aa1919',
    alignSelf: 'center',
  }
});
