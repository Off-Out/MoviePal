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
    this.state = {};
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
      movie: 'My Cousin Vinny',
      tmsId: 'MV000347260000',
      rootId: '13817',
      genre: 'comedy',
      rating: 'R',
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
      showtime: ['8:00 PM', '9:15 PM', '11:00 PM'],
      selectedTime: '',
    });

    /* await this.fetchTheaters(); */
  }
  async fetchTheaters() {
    const res = await axios.get(
      'http://data.tmsapi.com/v1.1/theatres?zip=60647&radius=1&units=mi&api_key=w8xkqtbg6vf3aj5vdxmc4zjj'
    );
    const movies = res.data.filter(theater => theater.name === 'Logan Theatre');

    console.log(movies);
  }
  handlePress(selectedTime) {
    this.setState({ selectedTime });
  }
  render() {
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

        <Title style={{ marginTop: 10 }}>Show Times</Title>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {!this.state.selectedTime ? (
            <FlatList
              horizontal={true}
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
            <Text>Purchase Tickets!</Text>
          )}
        </View>
        <View style={{ flex: 1, height: 60 }}>
          <Text style={{ margin: 10 }}>Select Tickets {`&`} Quantities</Text>
        </View>
      </View>
    );
  }
}

export default SingleEvent;
