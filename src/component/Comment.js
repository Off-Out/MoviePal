import React, { Component } from 'react';
import {
  material,
  sanFranciscoSpacing,
  robotoWeights,
  iOSColors,
  human,
  iOSUIKit,
} from 'react-native-typography';
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

const styles = StyleSheet.create({
  screenHeader: {
    fontSize: 34,

    letterSpacing: 5,
    color: '#aa1919',
    alignSelf: 'center',
  },
  feedText: {
    ...iOSUIKit.title3,
  },
  likesAndComments: {
    color: '#a1320c',

    fontSize: 12,
  },
  userDetails: {
    ...iOSUIKit.caption2Emphasized,
  },
  date: {
    ...material.caption,

    marginLeft: 15,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  submitButton: {},
  container: { flex: 1 },
  hashtags: {},
  footer: {
    margin: 0,
    padding: 0,
    height: 35,
  },
});

export default class Commment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedComments: [],
    };
  }

  timeSince = timeStamp => {
    console.log('timeStamp', timeStamp);
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
              <Left>
                <Thumbnail
                  small
                  source={
                    item.userPhoto
                      ? { uri: item.userPhoto }
                      : require('../image/user-account-icon-13.jpg')
                  }
                />
              </Left>
              <View style={{ flexDirection: '' }}>
                <Text style={styles.userDetails} note>
                  {item.userName + ' '} {'\n'}
                </Text>
                <Text> {item.comments}</Text>
              </View>
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
