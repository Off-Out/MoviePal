import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  render() {
    console.log('chatScreen', this.props.screenProps);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GiftedChat messages={this.state.messages} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
