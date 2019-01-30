import React from 'react';
import { StyleSheet, View, Picker, FlatList, SafeAreaView } from 'react-native';
import { Text, Title, Button } from 'react-native-paper';

import { EventCard } from '../component';
import axios from 'axios';

const gracenote = 'w8xkqtbg6vf3aj5vdxmc4zjj';
const isGraceNote =
  'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-01-28&zip=78701&api_key=w8xkqtbg6vf3aj5vdxmc4zjj';

class SingleEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: '',
      genres: '',
      rating: '',
      showtime: [],
      selectedTime: '',
      quantity: 0,
    };
    this.config = {
      url: 'http://data.tmsapi.com/v1.1/movies/showings',
      zipCode: '60647',
      jsonp: 'dataHandler',
      api_key: gracenote,
    };

    this.handlePress = this.handlePress.bind(this);
  }

  async componentDidMount() {
    this.setState({
      userGenre: 'horror',
      movie: 'Glass',
      tmsId: 'MV010018040000',
      rootId: '13817',
      genres: 'Thriller',
      rating: 'PG-13',
      time: 'evening',
      theater: 'Logan Theatre',
      zip: '60647',
      image: '',
      address: {
        city: 'Chicago',
        country: 'USA',
        postalCode: '60647',
        state: 'IL',
        street: '2626 N. Milwaukee Ave.',
      },
      geoCode: {
        latitude: '41.9297',
        longitude: '-87.7084',
      },
      theatreId: '2877',
      showtime: [],
      selectedTime: '',
      shortDescription: '',
      quantity: '',
      type: '',
    });

    await this.fetchTheaters();
  }
  async fetchTheaters() {
    const res = await axios.get(
      'http://data.tmsapi.com/v1.1/theatres/2877/showings?startDate=2019-01-29&numDays=5&imageSize=Sm&api_key=w8xkqtbg6vf3aj5vdxmc4zjj'
    );

    const movies = res.data.filter(movie => movie.tmsId === 'MV010018040000');
    const showtimes = movies[0].showtimes.map(
      movie => movie.dateTime.split('T')[1]
    );
    const rating = movies[0].ratings[0].code;
    const genres = movies[0].genres.join('');
    const image = movies[0].preferredImage.uri;
    const shortDescription = movies[0].shortDescription;

    this.setState({
      showtime: showtimes,
      rating: rating,
      genres: genres,
      shortDescription: shortDescription,
      image: image,
    });
    console.log('SHORT DESCRIPTION', shortDescription);
  }
  handlePress(selectedTime) {
    this.setState({ selectedTime });
  }
  render() {
    const { navigation } = this.props;
    const ticketQty = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const ticketType = ['Adult Weekday', 'Adult Weekend', 'Child', 'Senior'];
    const movie = navigation.getParam('movie', null);
    console.log('movie showtime and other details', movie);

    if (!this.state.shortDescription) {
      return <Text>...Loading</Text>;
    } else {
      return (
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-bottom',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <EventCard state={this.state} />
          </View>
          <View style={{ flex: 1 }}>
            <Title style={{ alignSelf: 'center', marginTop: 10 }}>
              Show Times
            </Title>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {!this.state.selectedTime ? (
                <FlatList
                  numColumns={3}
                  data={this.state.showtime}
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
              ) : (
                <View>
                  <Button onPress={() => this.setState({ selectedTime: '' })}>
                    All Showtimes
                  </Button>
                  <Text style={{ margin: 10, alignSelf: 'center' }}>
                    Select Tickets {`&`} Quantities
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                      style={{ width: 80 }}
                      onValueChange={itemValue =>
                        this.setState({ quantity: itemValue })
                      }
                    >
                      <Picker.Item
                        key="undelectable"
                        label="qty"
                        value={null}
                      />
                      {ticketQty.map(num => (
                        <Picker.Item key={num} label={num} value={num} />
                      ))}
                    </Picker>
                    <Picker style={{ width: 80 }}>
                      <Picker.Item key="undelectable" label="type" />
                      {ticketType.map(type => (
                        <Picker.Item key={type} label={type} value={type} />
                      ))}
                    </Picker>
                    <Picker key="undelectable" style={{ width: 80 }}>
                      <Picker.Item label="price" />
                    </Picker>
                  </View>

                  <Button
                    onPress={() =>
                      navigation.navigate('Chat', {
                        state: this.state,
                      })
                    }
                  >
                    Purchase Tickets!
                  </Button>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    }
  }
}

export default SingleEvent;
