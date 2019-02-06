import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Button,
  Text,
} from 'native-base';
import FeedBackEnd from './FeedBackEnd';
import Feed from './Feed';

export default class NewFeed extends Component {
  constructor() {
    super();

    this.state = {
      userId: '',
      userName: '',
      userPhoto: '',
      context: '',
      likes: 0,
      disabled: true,
    };
  }
  async componentDidMount() {
    await this.setState({
      userId: FeedBackEnd.getUid(),
      userName: FeedBackEnd.getName(),
      userPhoto: FeedBackEnd.getUserPhoto()
    });
    // console.log("newFeed", this.state)
  }

  handleInput = text => {
    this.setState({ context: text });
  };

  pressButton = () => {
    this.state.context ? this.setState({disabled: false}) : this.setState({disabled: true})
  }

  render() {
    return (
      <View
      style={{backgroundColor: "lightgoldenrodyellow"}}
      >
        <Item style={{borderColor: "transparent"}}>
          <Input
            style={styles.postInput}
            placeholder="SHARE SOMETHING..."
            onChangeText={text => {
              this.handleInput(text)
              this.pressButton()
            }}
          />
          <Button
            danger
            transparent
            small
            disabled={this.state.disabled}
            style={styles.postBtn}
            onPress={() => {
              FeedBackEnd.postFeed(this.state);
            }}
          >
            <Text style={{fontSize: 15, fontWeight: "bold" }}>POST</Text>
          </Button>
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postInput: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginTop: 5,
    marginBottom: 10,
    height: 50,
  },
  postBtn: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
});
