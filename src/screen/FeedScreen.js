import React, { Component } from 'react';
import { StyleSheet, View, Alert, Flatlist, SafeAreaView } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Asset, AppLoading } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import FeedBackEnd from '../component/FeedBackEnd';
import {auth, database} from '../firebase';
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
      headerTitle: '🎞 Movie Reel',
      headerRight: (
        <Ionicons
          name="ios-chatbubbles"
          style={{ marginRight: 10 }}
          size={24}
          onPress={() =>
            navigation.navigate('Chat')
          }
        />
      ),
    };
  };

  render () {
    return (
      <Container>
        <Content>
          {
            this.state.feeds.map(feed => (<Feed key={feed._id} feed={feed} userId={this.props.screenProps}/> )
          )}
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
  
  // componentWillUnmount() {
  //   FeedBackEnd.closeChat();
  // }
}


const styles = StyleSheet.create({
  container: { flex: 1 },
});
