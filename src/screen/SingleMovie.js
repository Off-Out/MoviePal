import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Text, Title, Button, Card } from 'react-native-paper';
import { EventCard } from '../component';
import axios from 'axios';
import { database } from '../firebase'
import Stor from '../store/Stor';

const gracenote = 'w8xkqtbg6vf3aj5vdxmc4zjj';
const isGraceNote =
  'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-01-28&zip=78701&api_key=w8xkqtbg6vf3aj5vdxmc4zjj';

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

  async fetchImage() {
    const image = this.props.navigation.getParam('movie');
  }
  handlePress(selectedTime) {
    const movieShowtime = this.props.navigation
      .getParam('movie', null)
      .showtimes.filter(movie => movie.dateTime.includes(selectedTime));
    console.log('AFTER PRESSING TIME', movieShowtime);
    this.setState({ selectedTime, ticketURI: movieShowtime[0].ticketURI });
  }

  goToChatRoom = (userId) => {
    console.log('go to chat room!')
    const { selectedTime } = this.state;
    const theater = this.props.navigation.getParam('theatre');
    const {title} = this.props.navigation.getParam('movie', null);

    const chatId = `${theater}${selectedTime}${title.substr(title.length - 5, title.length - 1)}`
    const today = new Date().toDateString();
    const chatRef = database.ref(`chatroom/${today}/` +  chatId);
    const userRef = database.ref('users/' + userId);

    chatRef.once('value', snapshot => {
      if (snapshot.exists()) {
        chatRef.child('users' + userId)
      } else {
        chatRef.set({
          movie: title,
          selectedTime,
          theater,
          users: userId,
        });
      }
    }).then(() => chatRef.child(`/users/${userId}`).set(true))
    .then(() => {
      userRef.update({
        pastMovies: {
          [`${today}`]: {
            movie: title,
            selectedTime: this.state.selectedTime,
            theater: theater,
          }
        }
      });
    })
    .then(() => {
      this.props.navigation.navigate('Chat'
      , {
        movieInfo: {
          movie: title,
          selectedTime: this.state.selectedTime,
          theater: theater
        },
      }
      )
    })
    .catch(error => console.error(error))
  }

  render() {
    const { navigation } = this.props;
    const theatre = this.props.navigation.getParam('theatre');

    const movie = navigation.getParam('movie', null);

    const showtimes = movie.showtimes.map(show => show.dateTime.split('T')[1]);

    if (!movie.shortDescription) {
      return <Text>...Loading</Text>;
    } else {
      return (
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
              <EventCard
                title={movie.title}
                genres={movie.genres}
                rating={movie.ratings[0].code}
                shortDescription={movie.shortDescription}
                uri={movie.preferredImage.uri}
                theatre={theatre}
              />
            </View>
            <View style={{ flex: 1.75, alignContent: 'center', marginTop: 20 }}>
              <Card
                style={{
                  backgroundColor: 'white',
                  width: this.vw(75),
                  height: this.vh(30),
                }}
                elevation={2}
              >
                <Card.Content>
                  <View
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {!this.state.selectedTime ? (
                      <View>
                        <Title style={{ alignSelf: 'center', marginTop: 10 }}>
                          Show Times
                        </Title>
                        <FlatList
                          numColumns={2}
                          data={showtimes}
                          renderItem={({ item }) => (
                            <Button
                              mode="outlined"
                              style={{
                                flexDirection: 'center',
                                height: 40,
                                width: 110,
                                margin: 10,
                                marginEnd: 10,
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
                        <Card
                          style={{
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            width: this.vw(40),
                            height: this.vh(15),
                            /*  alignItems: 'center', */
                            margin: 10,
                          }}
                          elevation={8}
                        >
                          <Card.Content
                            style={{ alignContent: 'space-around' }}
                          >
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
                              onPress={() => console.log('Play Trivia!')}
                            >
                              Play Trivia!
                            </Button>
                          </Card.Content>
                        </Card>
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
                                  text: 'Atom',
                                  icon: 'react',
                                  onPress: () => Linking.openURL('google.com'),
                                },
                                {
                                  text: 'Friendship',
                                  icon: 'paw',
                                  onPress: () =>
                                    navigation.navigate('Home', {
                                      movie: movie,
                                    }),
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
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}

export default SingleEvent;