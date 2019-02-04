import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

class EventCard extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTime: '',

      ticketURI: '',
    };
    this.handlePress = this.handlePress.bind(this);
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
  shouldComponentUpdate(prevProps) {
    return prevProps.movie !== this.props.movie;
  }
  render() {
    console.log('current state', this.state);
    return (
      <SafeAreaView>
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
          <Card.Content>
            <Card.Cover
              source={{
                uri:
                  'http://developer.tmsimg.com/' +
                  this.props.uri +
                  '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
              }}
            />

            <Title numberOfLines={2} style={{ alignSelf: 'center' }}>
              {this.props.title}
            </Title>
            <Paragraph style={{ alignSelf: 'center' }} numberOfLines={3}>
              {this.props.genres.join(', ')}
              {'   '}
              {this.props.rating}
            </Paragraph>

            <Paragraph style={{ alignSelf: 'center' }}>
              {this.props.theatre}
            </Paragraph>
            <Paragraph numberOfLines={5} ellipsizeMode="tail" style={{}}>
              {this.props.shortDescription}
            </Paragraph>
            {!this.state.selectedTime ? (
              <View>
                <Title style={{ alignSelf: 'center', marginTop: 10 }}>
                  Show Times
                </Title>
                <FlatList
                  numColumns={2}
                  data={this.props.showtimes}
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
                <Button onPress={() => this.setState({ selectedTime: '' })}>
                  All Showtimes
                </Button>
                <Card
                  style={{
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    width: this.vw(40),
                    height: this.vh(80),
                    /*  alignItems: 'center', */
                    margin: 10,
                  }}
                  elevation={8}
                >
                  <Card.Content style={{ alignContent: 'space-around' }}>
                    <Button
                      mode="outlined"
                      icon="info"
                      onPress={() => this.goToChatRoom(this.props.screenProps)}
                    >
                      Chat!
                    </Button>
                    <Button
                      mode="outlined"
                      icon="info"
                      // onPress={() =>
                      //   this.props.navigation.navigate('Trivia')
                      // }
                      onPress={() => this.props.navigation.navigate('Trivia')}
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

                          onPress: () => Linking.openURL(this.state.ticketURI),
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
          </Card.Content>
        </Card>
      </SafeAreaView>
    );
  }
}

export default EventCard;
