import React from 'react';
import { StyleSheet, View, Alert, Picker, FlatList } from 'react-native';
import {
  Divider,
  Text,
  Title,
  Button,
  Card,
  Paragraph,
} from 'react-native-paper';
import { EventCard } from '../component';

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
      genre: '',
      time: '',
      location: '',
      image: '',
      showtime: '',
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.setState({
      movie: 'Get Out',
      genre: 'horror',
      time: 'evening',
      location: 'Logan Square',
      image: 'https://picsum.photos/200/?random',
      showtime: '',
    });
  }
  handlePress(event, ind, label) {
    console.log('EVENT HERE', label);
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
        <Title style={{ marginTop: 20 }}>Show Times</Title>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <FlatList
            data={[{ time: `515` }, { time: '6:15' }, { time: `715` }]}
            renderItem={({ item }) => (
              <Button
                mode="outlined"
                style={{ height: 40, width: 40, margin: 10, marginEnd: 10 }}
                key={item.time}
                accessibilityLabel={item.time}
                onPress={(accessibilityLabel, key) =>
                  this.handlePress(accessibilityLabel, key, accessibilityLabel)
                }
              >
                {item.time}
              </Button>
            )}
          />
        </View>
        <View style={{ flex: 1, height: 60 }}>
          <Text style={{ margin: 10 }}>Select Tickets {`&`} Quantities</Text>
        </View>
      </View>
    );
  }
}

export default SingleEvent;
