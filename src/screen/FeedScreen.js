import React, { Component } from 'react';
import { StyleSheet, View, Alert, Flatlist, SafeAreaView } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import FeedBackEnd from '../component/FeedBackEnd';
import { auth, database } from '../firebase';
import NewFeed from '../component/NewFeed';
import Feed from '../component/Feed';

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: [],
      appIsReady: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: ' MOVIE REEL',
      headerTitleStyle: {
        fontSize: 25,
        letterSpacing: 3.75,
        width: '80%',
        color: '#aa1919',
        alignSelf: 'center',
        fontWeight: '300',
      },
      headerRight: (
        <Ionicons
          name="ios-chatbubbles"
          style={{ marginRight: 10, color: 'indianred' }}
          size={24}
          onPress={() => navigation.navigate('Chat')}
        />
      ),
    };
  };

  render() {
    /* let hashtags = this.state.feeds.filter(text => {
      let hash = '';
      if (text.context.includes('#')) {
        hash += text.context.slice(text.context.indexOf('#'));
        return hash;
      }
    });
    console.log('HASHTAGS', hashtags);
    let film = '🎞'; */
    return (
      <Container>
        <Content>
          {this.state.feeds
            .map(feed => (
              <Feed
                key={feed._id}
                feed={feed}
                userId={this.props.screenProps}
              />
            ))
            .reverse()}
        </Content>
        <NewFeed />
      </Container>
    );
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
}
