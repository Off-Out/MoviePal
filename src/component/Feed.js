import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import {
  material,
  sanFranciscoSpacing,
  robotoWeights,
  iOSColors,
  human,
  iOSUIKit,
} from 'react-native-typography';

import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Input,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FeedBackEnd from './FeedBackEnd';
import Comment from '../component/Comment';
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

export default class Feed extends Component {
  constructor(props) {
    super(props);

    const { feed } = this.props;

    this.state = {
      feed: {
        likes: feed.likes || '',
      },
      displayComment: false,
      newComment: '',
      userId: FeedBackEnd.getUid(),
      userName: FeedBackEnd.getName(),
      userPhoto: FeedBackEnd.getUserPhoto(),
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
    await database
      .ref(`/feeds/${this.props.feed._id}`)
      .on('value', snapshot => {
        this.setState({
          feed: {
            likes: snapshot.val().likes,
            feedComments: snapshot.val().feedComments,
          },
        });
      });
  }

  handleInput = text => {
    this.setState({ newComment: text });
  };

  showComment = () => {
    this.state.displayComment === false
      ? this.setState({ displayComment: true })
      : this.setState({ displayComment: false });
  };

  render() {
    const { feed } = this.props;

    const postTime = this.timeSince(feed.createdAt);

    let comments = '';
    if (feed.feedComments) {
      comments = Object.values(feed.feedComments);
    }

    console.log('FEED', feed.feedComments);
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail small source={ this.state.userPhoto ? {uri: this.state.userPhoto} :
            require('../image/user-account-icon-13.jpg')
          } />
          </Left>
          <View flexDirection="row">
            <Text style={styles.userDetails && { marginRight: 100 }}>
              {feed.userName}{' '}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <Text style={styles.feedText}>{feed.context}</Text>
        </CardItem>
        <Text style={styles.date}>{postTime}</Text>
        <CardItem style={styles.footer} footer bordered>
          <Left>
            <Button transparent onPress={() => FeedBackEnd.likePost(feed._id)}>
              <Icon active name="thumbs-up" style={{ color: '#a1320c' }} />
              <Text style={styles.likesAndComments}>
                {this.state.feed.likes} Likes
              </Text>
            </Button>
            <Button
              style={{ paddingTop: 3 }}
              transparent
              onPress={() => {
                this.showComment();
              }}
            >
              <Icon active name="chatbubbles" style={{ color: '#a1320c' }} />
              <Text style={styles.likesAndComments}>
                {comments.length} Comments
              </Text>
            </Button>
          </Left>
          {/*  <Right>
            <Text style={styles.date}>{postTime}</Text>
          </Right> */}
        </CardItem>
        {this.state.displayComment ? (
          <CardItem>
            <View style={{ display: 'flex' }}>
              <Comment feedId={this.props.feed._id} user={{userId: this.state.userId, userName: this.state.userName, userPhoto: this.state.userPhoto}}/>
              <Input
                style={styles.postInput}
                placeholder="Share comments..."
                onChangeText={text => this.handleInput(text)}
              />
              <Button
                primary
                transparent
                small
                style={styles.postBtn}
                onPress={() => {
                  FeedBackEnd.postComment(
                    this.props.feed._id,
                    this.state.newComment,
                    this.state.userId,
                    this.state.userName,
                    this.state.userPhoto
                  );
                }}
              >
                <Text>COMMENT</Text>
              </Button>
            </View>
          </CardItem>
        ) : (
          <View />
        )}
      </Card>
    );
  }
}
