import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  CardItem,
  Text,
  Body,
  Label,
  Input,
} from 'native-base';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import { auth, database } from '../firebase';
import Stor from '../store/Stor';
import { storage } from 'firebase';

const dummyMovieData = {
  movieImage: 'assets/p14939602_v_v5_aa.jpg',
  movie: 'Spider-Man: Into the Spider-Verse',
};

export default class HistoryScreen extends Component {
  constructor(screenProps) {
    super(screenProps);

    this.state = {
      movies: [],
    };
  }

  // async componentDidMount () {
  //   const userId = this.props.screenProps
  //   await database.ref(`users/${userId}`).on('value', snapshot => {
  //     console.log(snapshot.val())
  //       this.setState({
  //         movies: this.state.movies.push(Object.values(snapshot.val().pastMovies))
  //       })
  //   })
  // }

  render() {
    console.log('what are my movies', this.state.movies);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 10 }}>
          {/* <Header style={styles.header}> */}
          <Title style={{ marginRight: 20, alignSelf: 'center' }}>
            🍿MY MOVIES
          </Title>
          {/* </Header> */}
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text style={{ color: 'darkred' }}>
                  Spider-Man: Into the Spider-Verse
                </Text>
              </CardItem>
              <CardItem bordered style={{ width: 200, height: 100 }}>
                <Body style={{ flexDirection: 'row' }}>
                  <Image
                    source={{
                      uri:
                        'http://developer.tmsimg.com/' +
                        'assets/p14939602_v_v5_aa.jpg' +
                        '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                    }}
                    style={{ width: '45%', height: '65%' }}
                  />
                  <View style={{ display: 'flex' }}>
                    <Label style={{ fontSize: 12 }}>Your Review:</Label>
                    {/* <Input /> */}
                    <View style={{ flexDirection: 'row' }}>
                      <Label style={{ fontSize: 12 }}>Your Rating:</Label>
                      <Text>☆☆☆☆☆</Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
              <CardItem footer bordered>
                <Text style={{ fontSize: 10, color: 'darkred' }}>
                  AMC 600 North Michigan 9, 15:00 on Wed Jan 30 2019
                </Text>
              </CardItem>
            </Card>
          </Content>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    margin: -30,
    padding: -30,
  },
});
