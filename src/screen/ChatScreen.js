import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
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

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [
        { ...messages[0], sent: true, received: true },
      ]),
      step,
    }));
  };

  parsePatterns = linkStyle => {
    return [
      {
        pattern: /#(\w+)/,
        style: { ...linkStyle, color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ];
  };

  async componentWillMount() {
    // init with only system messages
    await Asset.fromModule(require('../../assets/avatar.png')).downloadAsync();
    this.setState({
      messages: '',
      appIsReady: true,
    });
  }

  render() {
    if (!this.state.appIsReady) {
      return <LoginScreen />;
    }
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="main"
        testID="main"
      >
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
