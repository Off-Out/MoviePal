import React, { Component } from 'react';
import { StyleSheet, View, Alert, Picker } from 'react-native';
import {
  Divider,
  Text,
  Title,
  Button,
  Card,
  Paragraph,
} from 'react-native-paper';
import { EventCard } from '../component';

const dummyDataGenre = [
  { genre: 'Action/Adventure', id: 1 },
  { genre: 'Art House', id: 2 },
  { genre: 'Comedy', id: 3 },
  { genre: 'Documentary', id: 4 },
  { genre: 'Drama', id: 5 },
  { genre: 'Family Friendly', id: 6 },
  { genre: 'Horror', id: 7 },
  { genre: 'Nostalgic', id: 8 },
  { genre: 'Romance', id: 9 },
  { genre: 'Rom-Com', id: 10 },
];
const dummyDataTime = [
  { time: 'morning', id: 1 },
  { time: 'afternoon', id: 2 },
  { time: 'evening', id: 3 },
  { time: 'after hours', id: 4 },
];

const dummyDataLocation = [
  {
    defaultLocation: [-87.639035, 41.895266],
    previousLocations: [],
  },
];

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      genre: '',
      time: '',
      location: '',
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ location: position });
      },
      error => Alert.alert(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log(this.state);
  }
  handlePress() {
    const userFilters = Object.keys(this.state).filter(
      field => this.state[field]
    );
    if (userFilters.length) {
      //BE SMARTER AND DONT USE THIS JUST A PLACEHOLDER
      console.log('USER SET FILTERS, SUPER!');
    } else {
      Alert.alert('Hey!', 'please select all fields before submitting!', {
        cancelable: false,
      });
    }
  }
  handleChange(itemValue, label, whatElse) {
    this.setState({ [whatElse]: itemValue });
    //thunk action here to add to db
  }
  render() {
    console.log(this.state);
    return (
      <View styles={styles.container}>
        <EventCard />

        <Picker
          itemStyle={{ height: 120 }}
          styles={styles.picker}
          selectedValue={this.state.genre}
          onValueChange={(itemValue, label) =>
            this.handleChange(itemValue, label, 'genre')
          }
        >
          <Picker.Item
            key="unselectable"
            styles={styles.pickerItem}
            label="genre"
            value={null}
          />
          {dummyDataGenre.map(event => (
            <Picker.Item
              key={event.id}
              label={event.genre}
              value={event.genre}
            />
          ))}
        </Picker>
        <Picker
          itemStyle={{ height: 120 }}
          styles={styles.picker}
          selectedValue={this.state.time}
          onValueChange={(itemValue, label) =>
            this.handleChange(itemValue, label, 'time')
          }
          value="time"
        >
          <Picker.Item key="unselectable" label="time" value={null} />
          {dummyDataTime.map(opt => (
            <Picker.Item key={opt.id} label={opt.time} value={opt.time} />
          ))}
        </Picker>

        <Picker
          itemStyle={{ height: 120 }}
          styles={styles.picker}
          selectedValue={this.state.location}
          onValueChange={(itemValue, label) =>
            this.handleChange(itemValue, label, 'location')
          }
        >
          <Picker.Item
            label="CURRENT LOCATION"
            value={this.state.geoLocation}
          />
        </Picker>
        <Button mode="contained" onPress={this.handlePress}>
          submit
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60,
  },
  picker: {
    flex: 2,
  },
});
