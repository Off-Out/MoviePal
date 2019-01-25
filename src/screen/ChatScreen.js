import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class ChatScreen extends Component {
  render() {
    console.log("chatScreen", this.props.screenProps)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
