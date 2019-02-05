import React, { Component } from 'react';
import {
  material,
  sanFranciscoSpacing,
  robotoWeights,
  iOSColors,
} from 'react-native-typography';
import { LinearGradient } from 'expo';
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
import { Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

import { auth, database } from '../firebase';
import Stor from '../store/Stor';
import { storage } from 'firebase';

const styles = StyleSheet.create({
  screenHeader: {
    fontSize: 34,

    letterSpacing: 5,
    color: '#aa1919',
    alignSelf: 'center',
  },
  movieTitle: {
    color: iOSColors.purple,
    ...material.robotoWeights,
    ...material.body1,
    maxWidth: Dimensions.get('window').width * (45 / 100),
    letterSpacing: 0.5,
  },
  userRatingsAndReviews: {
    ...material.caption,
  },
  theaterDetails: {
    ...material.caption,
    color: iOSColors.red,
  },
});

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
          review: 'terrifying',
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
      selectedMovie: '',
    };
    this.vw = this.vw.bind(this);
    this.vh = this.vh.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.deselectMovie = this.deselectMovie.bind(this);
  }

  async componentDidMount() {
    const userId = this.props.screenProps;
    this.userRef = database.ref(`/users/${userId}`);

    this.callback = snapshot => {
      let user = snapshot.val();
      /*  this.setState({
        name: user.pastMo,
        email: user.email,
        location: user.location,
        photo: user.photo,
      }); */

    };
    await this.userRef.on('value', this.callback);
  }

  componentWillUnmount() {
    this.userRef.off('value', this.callback);
  }

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  async selectMovie(movie) {
    await this.setState({ selectedMovie: movie });
  }
  async deselectMovie() {
    await this.setState({ selectedMovie: '' });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 10 }}>
          <LinearGradient colors={[('ff0100', 'cc0d0c', 0, 0)]} style={{}} />

          <Text style={styles.screenHeader}> MOVIE HISTORY</Text>
          <Divider />

          <Content style={{ flex: 1, margin: 10 }} padder>
            {this.state.selectedMovie ? (
              <Card
                style={{
                  alignContent: 'center',

                  alignSelf: 'center',
                  width: this.vw(90),
                  height: this.vh(35),

                  borderWidth: 2,
                  borderColor: '#aa1919',
                  borderTop: true,
                  borderBottom: true,
                  elevation: 4,
                  margin: 10,
                }}
                onPress={() => this.selectMovie()}
              >
                <Card.Content flexDirection="row">
                  <View
                    style={{ marginRight: 5, justifyContent: 'space-evenly' }}
                  >
                    <Text
                      numberOfLines={2}
                      style={styles.movieTitle}
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
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={material.caption}>Review: {}</Text>
                      <Text style={material.caption}>
                        {' '}
                        {this.state.selectedMovie.review}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <Text style={styles.userRatingsAndReviews}>
                        Rating: {}
                      </Text>
                      <Text style={styles.userRatingsAndReviews}>
                        {this.state.selectedMovie.rating}
                      </Text>
                    </View>

                    <Text style={styles.theaterDetails}>
                      {this.state.selectedMovie.theatre}
                      {'\n'}
                      {this.state.selectedMovie.time}
                    </Text>
                  </View>
                  <View style={{ width: this.vw(45) }}>
                    <Card.Cover
                      style={{
                        maxWidth: Dimensions.get('window').width * (40 / 100),
                      }}
                      source={{
                        uri:
                          'http://developer.tmsimg.com/' +
                          this.state.selectedMovie.image +
                          '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                      }}
                    />
                  </View>
                </Card.Content>
              </Card>
            ) : null}
            <FlatList
              numColumns={2}
              data={this.state.movies}
              renderItem={({ item }) => (
                <Card
                  key={item.movie}
                  style={{
                    alignSelf: 'center',
                    marginEnd: 10,
                    marginBottom: 10,
                    width: this.vw(40),
                    height: this.vh(40),

                    /* borderRadius: 4, */
                    /*   borderWidth: 2,
                    borderColor: 'red', */
                    elevation: 4,
                  }}
                  onPress={() => this.selectMovie(item)}
                >
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
                    style={{ width: this.vw(40), height: this.vh(40) }}
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

                  {/*  <View flexDirection="row">
                      <Label style={{ fontSize: '10%' }}>Your Rating: {}</Label>
                      <Text style={{ fontSize: '10%' }}>{item.rating}</Text>
                    </View> */}

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

                  {/*  <Text style={{ fontSize: '10%' }}>{item.time}</Text> */}
                </Card>
              )}
            />

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
