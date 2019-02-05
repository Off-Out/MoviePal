import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import { database } from '../firebase';

export default class Commment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedComments: [],
    };
  }

  timeSince = timeStamp => {
    let now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + 's';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + 'm';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + 'h';
    }
    if (secondsPast > 86400) {
      day = timeStamp.getDate();
      month = timeStamp
        .toDateString()
        .match(/ [a-zA-Z]*/)[0]
        .replace(' ', '');
      year =
        timeStamp.getFullYear() == now.getFullYear()
          ? ''
          : ' ' + timeStamp.getFullYear();
      return month + ' ' + day + year;
    }
  };

  async componentDidMount() {
    await database.ref(`/feeds/${this.props.feedId}`).on('value', snapshot => {
      if (snapshot.val().feedComments) {
        let comments = Object.values(snapshot.val().feedComments) || [];
        this.setState({
          feedComments: comments,
        });
      }
    });
  }

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.feedComments}
          keyExtractor={item => item.userId}
          renderItem={({ item }) => (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text note>{item.userName + ' '}</Text>
              <Text>{item.comments}</Text>
              <Text>{item.createdAt}</Text>
              {/* <Right>
                    <Text note>{this.timeSince(item.createdAt)}</Text>
                  </Right> */}
            </View>
          )}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  flatview: {
    flex: 1,
  },
});
