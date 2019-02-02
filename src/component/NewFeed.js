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
      comments: [],
      likes: 0
    }
  }

  componentDidMount() {
    // const userId = this.props.screenProps;
    // database.ref(`/users/${userId}`).on('value', snapshot => {
    //   let user = snapshot.val();
      this.setState({
        userId: FeedBackEnd.getUid(),
        userName: FeedBackEnd.getName(),
      });
    // });
  }

  handleInput = (text) => {
    this.setState({ context: text });
  };


  render() {
    return (
      <View style={styles.newPost}>
        <Input
          style={styles.postInput}
          placeholder='Write something...'
          onChangeText={text => this.handleInput(text)}
        />
        <Button
          primary
          transparent
          small
          style={styles.postBtn}
          onPress={() => {
            FeedBackEnd.postFeed(this.state)
            this.setState({context: ''})
          }}
        >
          <Text>POST</Text>
        </Button>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  // label: {
  //   fontSize: 13,
  //   marginLeft: 7,
  //   marginBottom: 10,
  // },
  postInput: {
    marginLeft: 7,
    fontSize: 17,
    marginRight: 20,
    paddingTop: 1,
    marginBottom: 10,
    borderColor: 'indianred',
    borderBottomWidth: 0.5,
  },
  newPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  postBtn: {
    alignSelf: 'flex-end',
    // padding: -30,
    // marginBottom: -20,
    fontSize: 5,
  },
});
