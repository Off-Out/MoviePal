import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Animated,
  FlatList,
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
      movies: [
        {
          movie: 'Spider-Man: Into the Spider-Verse',
          image: 'assets/p14939602_v_v5_aa.jpg',
          review: 'family fun!',
          rating: '☆☆☆☆☆',
          theatre: 'AMC 600 North Michigan 9',
          time: '15:00 on Wed Jan 30 2019',
        },
        {
          movie: 'Glass',
          image: 'assets/p14087450_v_v6_aa.jpg',
          review: 'absolutely terrifying. no thank you.',
          rating: '☆',
          theatre: 'Logan Square Theatre',
          time: '9:00 on Tue Jan 29 2019',
        },
        {
          movie: 'Spider-Man: Into the Spider-Verse',
          image: 'assets/p14939602_v_v5_aa.jpg',
          review: 'family fun!',
          rating: '☆☆☆☆☆',
          theatre: 'AMC 600 North Michigan 9',
          time: '15:00 on Wed Jan 30 2019',
        },
      ],
      selectedMovie: {},
    };
    this.selectMovie = this.selectMovie.bind(this);
  }

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  async selectMovie(movie) {
    console.log('SELECTED MOVIE ARGS', movie);

    await this.setState({ selectedMovie: movie });

    console.log('SET MOVIE ON STATE', this.state.selectedMovie);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 10 }}>
          {/* <Header style={styles.header}> */}
          <Title style={{ marginRight: 20, alignSelf: 'center' }}>
            🍿MY MOVIES
          </Title>
          {/* </Header> */}
          <Content style={{ flex: 1, margin: 10 }} padder>
            <FlatList
              numColumns={2}
              data={this.state.movies}
              renderItem={({ item }) => (
                <Card
                  key={item.movie}
                  style={{
                    alignSelf: 'center',
                    width: this.vw(40),
                    height: this.vh(40),
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: 'red',
                    elevation: 4,
                  }}
                  onPress={() => this.selectMovie(item)}
                >
                  <Card.Content>
                    {/*      <Title
                      numberOfLines={1}
                      style={{
                        alignSelf: 'center',
                        color: 'darkred',
                        width: this.vw(40),
                      }}
                      ellipsizeMode="tail"
                    >
                      {movie.movie}
                    </Title> */}
                    <Card.Cover
                      source={{
                        uri:
                          'http://developer.tmsimg.com/' +
                          item.image +
                          '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                      }}
                    />

                    {/*  <Image
                      source={{
                        uri:
                        'http://developer.tmsimg.com/' +
                        'assets/p14939602_v_v5_aa.jpg' +
                        '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                      }}
                      style={{ width: '45%', height: '65%' }}
                    /> */}

                    {/*  <Label style={{ fontSize: 12 }}>Your Review:</Label>

                    <Text numberOfLines={1} ellipsizeMode="tail">
                      {movie.review}
                    </Text> */}
                    <View flexDirection="row">
                      <Label style={{ fontSize: '10%' }}>Your Rating: {}</Label>
                      <Text style={{ fontSize: '10%' }}>{item.rating}</Text>
                    </View>

                    {/*  <Paragraph
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 10,
                        color: 'darkred',
                      }}
                    >
                      {movie.theatre}
                      {'\n'}
                      {movie.time}
                    </Paragraph> */}
                    <Text style={{ fontSize: '10%' }}>{item.time}</Text>
                  </Card.Content>
                </Card>
              )}
            />

            {this.state.selectedMovie ? (
              <Card
                style={{
                  alignSelf: 'center',
                  width: this.vw(75),
                  height: this.vh(50),
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: 'red',
                  elevation: 4,
                }}
              >
                <Card.Content>
                  <Title
                    numberOfLines={1}
                    style={{
                      alignSelf: 'center',
                      color: 'darkred',
                      width: this.vw(70),
                    }}
                    ellipsizeMode="tail"
                    onPress={e => {
                      this.props.navigation.navigate('SingleMovie', {
                        history: true,
                        movie: dummyMovieData.movie,
                        image: dummyMovieData.movieImage,
                      });
                    }}
                  >
                    {this.state.selectedMovie.movie}
                  </Title>
                  <Card.Cover
                    source={{
                      uri:
                        'http://developer.tmsimg.com/' +
                        this.state.selectedMovie.image +
                        '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                    }}
                  />

                  <View style={{ display: 'flex' }}>
                    <Label style={{ fontSize: 12 }}>
                      {this.state.selectedMovie.review}
                    </Label>
                    {/* <Input /> */}
                    <View style={{ flexDirection: 'row' }}>
                      <Label style={{ fontSize: 12 }}>
                        {this.state.selectedMovie.rating}
                      </Label>
                      <Text>☆☆☆☆☆</Text>
                    </View>
                    <Paragraph
                      style={{
                        fontSize: 10,
                        color: 'darkred',
                      }}
                    >
                      {this.state.selectedMovie.theatre}
                      {'\n'}
                      {this.state.selectedMovie.time}
                    </Paragraph>
                  </View>
                </Card.Content>
              </Card>
            ) : null}
            {/* <View flexDirection="row" numColumns={2}>
              {this.state.movies.map(movie => (

              ))}
            </View> */}
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
