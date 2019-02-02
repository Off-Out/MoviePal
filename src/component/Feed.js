import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import FeedBackEnd from './FeedBackEnd';

export default class Feed extends Component {
  render() {
    const {feed} = this.props;
    console.log("feedProps", feed);
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail 
            source={{uri: '../image/user-account-icon-13.jpg'}}
            />
              <Text>{feed.userName}</Text>
              <Text note>GeekyAnts</Text>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Text>{feed.context}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Button
            transparent
            onPress={() => FeedBackEnd.likePost(feed._id)}
            >
              <Icon active name="thumbs-up" />
              <Text>{feed.likes} Likes</Text>
            </Button>
          </Left>
          {/* <Body>
            <Button
            transparent
              onPress={() => FeedBackEnd.postComment()}
            >
              <Icon active name="chatbubbles" />
              <Text>{feed.comments} Comments</Text>
            </Button>
          </Body> */}
          <Right>
            <Text>11hr ago</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}