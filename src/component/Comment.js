import React, { Component } from 'react';
import {
  material,
  sanFranciscoSpacing,
  robotoWeights,
  iOSColors,
  human,
  iOSUIKit,
} from 'react-native-typography';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
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
  Card,
  CardItem
} from 'native-base';
import { Divider } from 'react-native-paper';
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
    fontSize: 15,
    color:"steelblue"
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
  theaterDetails: {
    ...material.caption,
    color: '#a1320c',
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
    let now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + ' seconds ago';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + ' minutes ago';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + ' hours ago';
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
      <FlatList
        data={this.state.feedComments.reverse()}
        keyExtractor={item => item.createdAt.toString()}
        renderItem={({ item }) => (
          <Card transparent style={{
            width: Dimensions.get('window').width,
            borderBottomColor: "steelblue",
            borderBottomWidth: 0.55
          }}>
        <CardItem style={{paddingTop: 0, paddingBottom: 0}}>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            style={[styles.feedText,{ width: Dimensions.get('window').width * (80 / 100) } ]}>{item.comments}</Text>
        </CardItem>
        <CardItem style={{paddingTop: 7, paddingBottom: 7}}>
          <Left >
            <Thumbnail
              small
              source={
                item.userPhoto
                  ? { uri: item.userPhoto }
                  : require('../image/user-account-icon-13.jpg')
              }
            />
            <Text style={styles.userDetails && { marginLeft: 10 }} note>
              {item.userName}{' '}
            </Text>
          </Left>
          <Right>
          <Text style={styles.date}>{this.timeSince(item.createdAt)}</Text>
          </Right>
          <View flexDirection="row" />
        </CardItem>
      </Card>
        )}
  />
    )}
}