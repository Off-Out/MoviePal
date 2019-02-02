import React, { Component } from 'react';
import { StyleSheet, View, Alert, Flatlist, SafeAreaView } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../firebase';
import FeedBackEnd from '../component/FeedBackEnd';
import ChatNavBar from '../component/ChatNavBar';
import Stor from '../store/Stor';
import NewFeed from '../component/NewFeed';
import Feed from '../component/Feed';
import { FULLSCREEN_UPDATE_PLAYER_DID_DISMISS } from 'expo/build/av/Video';

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: [],
      appIsReady: false,
    };
  }

  render () {
    // const movieInfo = this.props.navigation.getParam("movieInfo")
    // if (!movieInfo) {
    //   Alert.alert("Please join an event to enter the event's chatroom!")
    //   this.props.navigation.navigate("Map")
    //   return null
    // } else {
      console.log(this.state.feeds, "<<<<<feeds")
      return (
        <Container>
          <Header>
            <Title>Movie Reel 🎞</Title>
          </Header>
          <Content>
            {
              this.state.feeds.map(feed => (<Feed key={feed._id} feed={feed} /> )
            )}
          </Content>
          <NewFeed />
        </Container>
      );
    // }
  }

  componentDidMount() {
    FeedBackEnd.loadFeeds(feed => {
      this.setState(previousState => {
        return {
          feeds: [...previousState.feeds, feed],
        };
      });
    });
  }
  
  componentWillUnmount() {
    FeedBackEnd.closeChat();
  }
}


const styles = StyleSheet.create({
  container: { flex: 1 },
});
