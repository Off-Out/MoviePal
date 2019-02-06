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
    marginTop: 5,
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
        feedComments: [],
      },
      displayComment: false,
      newComment: '',
      userId: FeedBackEnd.getUid(),
      userName: FeedBackEnd.getName(),
      userPhoto: FeedBackEnd.getUserPhoto(),
      disabled: true,
    };
  }

  timeSince = timeStamp => {
    // console.log("feed timeStamp", timeStamp)
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
    await database.ref(`/feeds/${this.props.feed._id}`).on('value', snapshot => {
      if (snapshot.val().feedComments) {
        let comments = Object.values(snapshot.val().feedComments) || [];
        this.setState({
          feed: {
            likes: snapshot.val().likes,
            feedComments: comments
          }
        });
      } else {
        this.setState({
          feed: {
            likes: snapshot.val().likes,
          }
        });
      }
    })
  }

  handleInput = text => {
    this.setState({ newComment: text });
  };

  showComment = () => {
    this.state.displayComment === false
      ? this.setState({ displayComment: true })
      : this.setState({ displayComment: false });
  };

  pressButton = () => {
    this.state.newComment ? this.setState({disabled: false}) : this.setState({disabled: true})
  }

  render() {
    const { feed } = this.props;
    const postTime = this.timeSince(feed.createdAt);
    let comments = 0;
    if (this.state.feed.feedComments) {
      comments = this.state.feed.feedComments.length
    }

    return (
      <Card>
        <CardItem>
          <Left >
            <Thumbnail
              small
              source={
                feed.userPhoto
                  ? { uri: feed.userPhoto }
                  : require('../image/user-account-icon-13.jpg')
              }
            />
            <Text style={styles.userDetails && { marginLeft: 10 }} note>
              {feed.userName}{' '}
            </Text>
          </Left>
          <Right>
          <Text style={styles.date}>{postTime}</Text>
          </Right>
          <View flexDirection="row" />
        </CardItem>
        <CardItem>
          <Text style={styles.feedText}>{feed.context}</Text>
        </CardItem>
        {/* <Text style={styles.date}>{postTime}</Text> */}
        <CardItem style={styles.footer} footer bordered>
          <Left>
            <Button transparent onPress={() => FeedBackEnd.likePost(feed._id)}>
              <Icon active name="thumbs-up" style={{ color: '#a1320c' }} />
              {this.state.feed.likes > 1 ? (
                <Text style={styles.likesAndComments}>
                  {this.state.feed.likes} Likes
                </Text>
              ) : (
                <Text style={styles.likesAndComments}>
                  {this.state.feed.likes} Like
                </Text>
              )}
            </Button>
            <Button
              style={{ paddingTop: 3 }}
              transparent
              onPress={() => {
                this.showComment();
              }}
            >
              <Icon active name="chatbubbles" style={{ color: '#a1320c' }} />
              {comments > 1 ? (
                <Text style={styles.likesAndComments}>
                  {comments} Comments
                </Text>
              ) : (
                <Text style={styles.likesAndComments}>
                  {comments} Comment
                </Text>
              )}
            </Button>
          </Left>
          {/*  <Right>
            <Text style={styles.date}>{postTime}</Text>
          </Right> */}
        </CardItem>
        {this.state.displayComment ? (
          <CardItem style={{paddingLeft: 0, paddingRight: 0}}>
            <View style={{ display: 'flex', flex: 1}}>
              <Comment
                feedId={feed._id}
                user={{
                  userId: feed.userId,
                  userName: feed.userName,
                  userPhoto: feed.userPhoto,
                }}
              />
              <View style={{marginRight: 0, marginLeft: 0,backgroundColor: "lightblue", display: "flex", flexDirection: "row"}}>
              <Input
                style={{fontSize: 13, width: "100%" }}
                placeholder="SHARE COMMENTS..."
                onChangeText={text => {
                  this.handleInput(text)
                  this.pressButton()
                }}
              />
              <Button
                primary
                transparent
                small
                disabled={this.state.disabled}
                style={{marginTop: 10}}
                onPress={() => {
                    FeedBackEnd.postComment(
                      this.props.feed._id,
                      this.state.newComment,
                      this.state.userId,
                      this.state.userName,
                      this.state.userPhoto
                    );
                  }
                }
              >
                <Text style={{fontWeight: "bold"}}>COMMENT</Text>
              </Button>
              </View>
            </View>
          </CardItem>
        ) : (
          <View />
        )}
      </Card>
    );
  }
}
