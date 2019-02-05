import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import FeedBackEnd from './FeedBackEnd';
import { database } from '../firebase';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    const { feed } = this.props;

    this.state = {
      feed: {
        likes: feed.likes || '',
      },
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
      return day + ' ' + month + year;
    }
  };

  componentDidMount() {
    database.ref(`/feeds/${this.props.feed._id}`).on('value', snapshot => {
      this.setState({
        feed: {
          likes: snapshot.val().likes,
        },
      });
    });
  }

  render() {
    const { feed } = this.props;
    const postTime = this.timeSince(feed.createdAt);
    console.log('feedProps', feed);
    return (
      <Card>
        <CardItem>
          <Text style={{ fontSize: 14 }}>{feed.userName} </Text>
          <Text style={{ fontSize: 12 }} note>
            {' '}
            GeekyAnts
          </Text>
        </CardItem>
        <CardItem>
          <Text>{feed.context}</Text>
        </CardItem>
        <CardItem style={styles.footer} footer bordered>
          <Left>
            <Button
              transparent
              // bordered
              onPress={() => FeedBackEnd.likePost(feed._id)}
            >
              <Icon active name="thumbs-up" />
              <Text style={{ padding: 5 }}>{this.state.feed.likes} Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button
              transparent
              onPress={() => {
                FeedBackEnd.postComment();
              }}
            >
              <Icon active name="chatbubbles" />
              <Text>{feed.comments.length} Comments</Text>
            </Button>
            <CardItem style={styles.display}>
              <Text>{feed.context}</Text>
            </CardItem>
          </Body>
          <Right>
            <Text style={{ fontSize: 12 }}>{postTime}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    margin: 0,
    padding: 0,
    height: 35,
  },
});
