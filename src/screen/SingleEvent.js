import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Picker,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  Divider,
  Text,
  Title,
  Button,
  Card,
  Paragraph,
} from 'react-native-paper';
import { EventCard } from '../component';
import axios from 'axios';

const gracenote = 'w8xkqtbg6vf3aj5vdxmc4zjj';
const isGraceNote =
  'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-01-28&zip=78701&api_key=w8xkqtbg6vf3aj5vdxmc4zjj';

const dummyDataGenre = {
  genre: 'Horror',
  id: 7,
  genrePosterURI: 'https://picsum.photos/200/?',
};

const dummyDataTime = [
  { time: 'morning', id: 1 },
  { time: 'afternoon', id: 2 },
  { time: 'evening', id: 3 },
  { time: 'after hours', id: 4 },
];

const dummyUser = {
  name: 'Cindy',
  email: 'cindy@cindy.com',
  id: 1,
};
const dummyTheater = {
  theater: 'Logan Square Theater',
  id: 1,
  location: 'Logan Square, Chicago',
};
const dummyJoinTable = {
  userId: 1,
  genreId: 7,
  timeId: 3,
  theaterId: 1,
};
const dummyShowTimes = [{ time: `515` }, { time: '6:15' }, { time: `715` }];

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
                  <Text style={{ margin: 10 }}>
                    Select Tickets {`&`} Quantities
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.quantity}
                      onValueChange={itemValue =>
                        this.setState({ quantity: itemValue })
                      }
                    >
                      <Picker.Item
                        key="unselectable"
                        label="quantity"
                        value={0}
                      />
                      <Picker.Item label="1" value={1} />
                      <Picker.Item label="2" value={2} />
                      <Picker.Item label="3" value={3} />
                      <Picker.Item label="4" value={4} />
                      <Picker.Item label="5" value={5} />
                      <Picker.Item label="6" value={6} />
                    </Picker>

                    <Button>Purchase Tickets!</Button>
                  </View>
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
