import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Search extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          marginTop: 25,
          backgroundColor: 'white',
          marginHorizontal: 20,
          zIndex: 1,
          position: 'absolute',
        }}
      >
        <Ionicons
          name="ios-search"
          size={20}
          onPress={() => this.props.handleZipCodeSubmit()}
        />
        <TextInput
          placeholder="Search for local movie theaters"
          placeholderTextColor="grey"
          style={{
            flex: 1,
            fontWeight: '700',
            backgroundColor: 'white',
            marginLeft: 5,
          }}
          onChangeText={text => {
            this.props.handleZipCodeChange(text);
          }}
        />
        <Ionicons name="ios-options" size={20} />
      </View>
    );
  }
}
