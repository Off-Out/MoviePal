import React from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {
  View,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Text, Title, Button, Card, Paragraph } from 'react-native-paper';
import { EventCard } from '../component';
// import axios from 'axios';
import { database } from '../firebase';
import Stor from '../store/Stor';

// const gracenote = 'w8xkqtbg6vf3aj5vdxmc4zjj';
// const isGraceNote =
//   'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-01-28&zip=78701&api_key=w8xkqtbg6vf3aj5vdxmc4zjj';

class SingleEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTime: '',
      ticketURI: '',
    };
    this.handlePress = this.handlePress.bind(this);
  }

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }
  handlePress = selectedTime => {
    const movieShowtime = this.props.navigation
      .getParam('movie', null)
      .showtimes.filter(movie => movie.dateTime.includes(selectedTime));

    this.setState({ selectedTime, ticketURI: movieShowtime[0].ticketURI });
  };

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  async fetchImage() {
    const image = this.props.navigation.getParam('movie');
  }

  goToChatRoom = userId => {
    const { selectedTime } = this.state;
    const theater = this.props.navigation.getParam('theatre');
    const { title } = this.props.navigation.getParam('movie', null);

    const chatId = `${theater}${selectedTime}${title.substr(
      title.length - 5,
      title.length - 1
    )}`;
    const today = new Date().toDateString();
    // midnight problem!
    const chatRef = database.ref(`chatroom/${today}/` + chatId);
    const userRef = database.ref('users/' + userId);

    chatRef
      .once('value', snapshot => {
        if (snapshot.exists()) {
          chatRef.child('users' + userId);
        } else {
          chatRef.set({
            movie: title,
            selectedTime,
            theater,
            users: userId,
          });
        }
      })
      .then(() => chatRef.child(`/users/${userId}`).set(true))
      .then(() => {
        userRef.update({
          pastMovies: {
            [`${today}`]: {
              movie: title,
              selectedTime: this.state.selectedTime,
              theater: theater,
            },
          },
          chatId,
        });
      })
      .then(() => {
        this.props.navigation.navigate('Chat', {
          movieInfo: {
            movie: title,
            selectedTime: this.state.selectedTime,
            theater: theater,
            chatId: chatId,
          },
        });
      })
      .catch(error => console.error(error));
  };

  render() {
    console.log('SINGLE MOVIE PROPS', this.props.movie);
    const { navigation } = this.props;
    const theatre = this.props.navigation.getParam('theatre');

    const movie = navigation.getParam('movie', null);

    let Showtimes;
    if (movie.showtimes) {
      Showtimes = movie.showtimes.map(show => show.dateTime.split('T')[1]);
    } else {
      Showtimes = null;
    }

    if (!movie.shortDescription) {
      return <Image source={require('../image/logo.png')} />;
    } else {
      return (
        <SafeAreaView>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri:
                'http://developer.tmsimg.com/' +
                movie.preferredImage.uri +
                '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'flex-bottom',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 2 }}>
                <Card
                  style={{
                    backgroundColor: 'white',
                    width: this.vw(75),
                    height: this.vh(80),
                    /*  alignItems: 'center', */
                    margin: 10,
                  }}
                  elevation={4}
                >
                  <ScrollView>
                    <Card.Content>
                      <Card.Cover
                        source={{
                          uri:
                            'http://developer.tmsimg.com/' +
                            movie.preferredImage.uri +
                            '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                        }}
                      />

                      <Title numberOfLines={2} style={{ alignSelf: 'center' }}>
                        {movie.title}
                      </Title>
                      <Paragraph
                        style={{ alignSelf: 'center' }}
                        numberOfLines={3}
                      >
                        {movie.genres ? movie.genres.join(', ') : null}
                        {'   '}
                        {movie.rating}
                      </Paragraph>

                      <Paragraph style={{ alignSelf: 'center' }}>
                        {theatre}
                      </Paragraph>
                      <Paragraph
                        numberOfLines={5}
                        ellipsizeMode="tail"
                        style={{}}
                      >
                        {movie.shortDescription}
                      </Paragraph>
                      {!this.state.selectedTime ? (
                        <View>
                          <Title style={{ alignSelf: 'center', marginTop: 10 }}>
                            Show Times
                          </Title>
                          <FlatList
                            numColumns={2}
                            data={Showtimes}
                            renderItem={({ item }) => (
                              <Button
                                mode="outlined"
                                style={{
                                  flexDirection: 'center',
                                  height: 40,
                                  width: 100,
                                  margin: 10,
                                }}
                                key={item}
                                accessibilityLabel={item}
                                onPress={() => this.handlePress(item)}
                              >
                                {item}
                              </Button>
                            )}
                          />
                        </View>
                      ) : (
                        <View style={{}}>
                          <Button
                            onPress={() => this.setState({ selectedTime: '' })}
                          >
                            All Showtimes
                          </Button>

                          <Button
                            mode="outlined"
                            icon="info"
                            onPress={() =>
                              this.goToChatRoom(this.props.screenProps)
                            }
                          >
                            Chat!
                          </Button>
                          <Button
                            mode="outlined"
                            icon="info"
                            // onPress={() =>
                            //   this.props.navigation.navigate('Trivia')
                            // }
                            onPress={() =>
                              this.props.navigation.navigate('Trivia')
                            }
                          >
                            Play Trivia!
                          </Button>

                          <Button
                            onPress={() =>
                              Alert.alert(
                                'Choose from one of our partners',
                                'options below',
                                [
                                  {
                                    text: 'Fandango',
                                    icon: 'movie',

                                    onPress: () =>
                                      Linking.openURL(this.state.ticketURI),
                                  },
                                  {
                                    text: 'Add to Calendar',
                                    icon: 'calendar',
                                    onPress: () =>
                                      AddCalendarEvent.presentEventCreatingDialog(
                                        movie.title,
                                        this.state.selectedTime
                                      ),
                                  },
                                  {
                                    text: 'Cancel',

                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                ],
                                { cancelable: true }
                              )
                            }
                          >
                            Purchase Tickets!
                          </Button>
                        </View>
                      )}
                    </Card.Content>
                  </ScrollView>
                </Card>
              </View>
              <View
                style={{ flex: 1.75, alignContent: 'center', marginTop: 20 }}
              >
                {/*   </View>
                  </Card.Content>
                </Card> */}
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    movie: state.selectedMovie,
    longitude: state.longitude,

  };
};

/* const mapDispatchToProps = dispatch => {
  return {
    fetchTheaters: theaterID => dispatch(fetchTheaters(theaterID)),
    fetchMovies: (lat, long) => dispatch(fetchMovies(lat, long)),
    selectMovie: movie => dispatch(selectMovie(movie)),
  };
}; */

export default connect(mapStateToProps)(SingleEvent);
