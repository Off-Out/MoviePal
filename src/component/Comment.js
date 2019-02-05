import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base'
import {database} from '../firebase'

export default class Commment extends Component {
  constructor(props) {
    super(props)

    console.log(this.props, "commentprops")

    this.state = {
        feedComments: [],
      }
    }


  async componentDidMount () {
    await database.ref(`/feeds/${this.props.feedId}`).on('value', snapshot => {
      let comments = Object.values(snapshot.val().feedComments)
      this.setState({
        feedComments: comments,
      })
    });
    console.log("this.state.feedComments", this.state.feedComments)
  }

  render() {

    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
          >
            <FlatList
              data={this.state.feedComments}
              keyExtractor={item => item.userId}
              renderItem={({ item }) => (
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Text note>{item.userName + ' '}</Text>
                  <Text>{item.comments}</Text>
                </View>
              )}
  
            />
          </List>
    )
  }
}

const styles = StyleSheet.create({
  flatview: {
    flex: 1,
  },
});