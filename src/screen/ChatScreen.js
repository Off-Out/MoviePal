import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatBackEnd from '../component/ChatBackEnd'
// Sentry is a crash reporting and aggregation platform that provides you with "real-time insight into production deployments with info to reproduce and fix crashes"
// import Sentry from 'sentry-expo';
import LoginScreen from './LoginScreen';
import NavBar from '../component/NavBar';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      appIsReady: false,
    };
  }

  render() {
    const info = this.props.navigation.getParam('info')

    return (
      <View style={styles.container}>
      <NavBar movie={info.movie}/>
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
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
  componentDidMount() {
    ChatBackEnd.loadMessages((message) => {
      this.setState((previousState) => {
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

// ChatScreen.defaultProps = {
//   name: 'John Smith',
// };

// ChatScreen.propTypes = {
//   name: React.PropTypes.string,
// };

  // onSend = (messages = []) => {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, [
  //       { ...messages[0], sent: true, received: true },
  //     ]),
  //   }));
  // };

  // parsePatterns = linkStyle => {
  //   return [
  //     {
  //       pattern: /#(\w+)/,
  //       style: { ...linkStyle, color: 'darkorange' },
  //       onPress: () => Linking.openURL('http://gifted.chat'),
  //     },
  //   ];
  // };

  // async componentWillMount() {
  //   // init with only system messages
  //   await Asset.fromModule(require('../../assets/avatar.png')).downloadAsync();
  //   this.setState({
  //     messages: '',
  //     appIsReady: true,
  //   });
  // }

//   render() {
//     if (!this.state.appIsReady) {
//       return <LoginScreen />;
//     }
//     return (
//       <View
//         style={styles.container}
//         accessible
//         accessibilityLabel="main"
//         testID="main"
//       >
//         <NavBar />
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={this.onSend}
//           keyboardShouldPersistTaps="never"
//           user={{
//             _id: 1,
//           }}
//           parsePatterns={this.parsePatterns}
//         />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: { flex: 1 },
});
