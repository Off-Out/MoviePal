import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Input, Item, Button, Text} from 'native-base';
import FeedBackEnd from './FeedBackEnd';
import Feed from './Feed';

export default class NewFeed extends Component {
  constructor() {
    super()
    
    this.state = {
      userId:'',
      userName: '',
      context: '',
      likes: 0
    }
  }
  async componentDidMount() {
    await this.setState({
      userId: FeedBackEnd.getUid(),
      userName: FeedBackEnd.getName()
    });
    console.log("newFeed", this.state)
  }

  handleInput = (text) => {
    this.setState({ context: text });
  };


  render() {
    return (
      <View
      // style={styles.newPost}
      >
        <Item regular>
        <Input 
          style={styles.postInput}
          placeholder='Share something...'
          onChangeText={text => this.handleInput(text)}
        />
        <Button
          primary
          transparent
          small
          style={styles.postBtn}
          onPress={() => {
            FeedBackEnd.postFeed(this.state)
          }}
          >
          <Text style={{color: "indianred"}}>POST</Text> 
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
    fontSize: 10,
    borderWidth: 0.75,
    borderColor: 'indianred',
    marginTop: 5,
    marginBottom: 5,
    height: 30
  },
  postBtn: {
    alignSelf: 'flex-end',
    // padding: -30,
    // marginBottom: -20,
    fontSize: 5,
  },
});
