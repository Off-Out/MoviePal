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
import { Avatar } from 'react-native-elements';
import { database } from '../firebase';

export default class Commment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedComments: [],
    };
  }

  timeSince = timeStamp => {
    console.log("timeStamp", timeStamp)
    let now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
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
<<<<<<< HEAD
    await this.setState({ user: this.props.user });
=======
>>>>>>> 972023c8b81211c6e55d4b5a847456c90747a330
  }

  render() {
    // console.log(this.state.feedComments, "FEEDCOMMENTS")
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.feedComments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({ item }) => (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
<<<<<<< HEAD
              <Left>
                <Thumbnail
                  small
                  source={
                    this.state.user.userPhoto
                      ? { uri: this.state.user.userPhoto }
                      : require('../image/user-account-icon-13.jpg')
                  }
                />
              </Left>
=======
          <Left>
            <Thumbnail small source={ item.userPhoto ? {uri: item.userPhoto} :
            require('../image/user-account-icon-13.jpg')
          } />
          </Left>
>>>>>>> 972023c8b81211c6e55d4b5a847456c90747a330
              <Text note>{item.userName + ' '}</Text>
              <Text>{item.comments}</Text>
              <Text>{this.timeSince(item.createdAt)}</Text>
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
