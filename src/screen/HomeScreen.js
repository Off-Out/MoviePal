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
import firebase, { auth, database } from '../firebase';

const HorrorPoster = 'poster';

const dummyDataGenre = [
  {
    genre: 'Action/Adventure',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 1,
  },
  {
    genre: 'Art House',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 2,
  },
  {
    genre: 'Comedy',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 3,
  },
  {
    genre: 'Documentary',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 4,
  },
  {
    genre: 'Drama',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 5,
  },
  {
    genre: 'Family Friendly',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 6,
  },
  {
    genre: 'Horror',
    genrePosterURI: '../image/Horror.png',
    id: 7,
  },
  {
    genre: 'Nostalgic',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 8,
  },
  {
    genre: 'Romance',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 9,
  },
  {
    genre: 'Rom-Com',
    genrePosterURI: 'https://picsum.photos/200/?random',
    id: 10,
  },
];
const dummyDataTime = [
  { time: 'morning', id: 1 },
  { time: 'afternoon', id: 2 },
  { time: 'evening', id: 3 },
  { time: 'after hours', id: 4 },
];

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      genre: '',
      time: '',
      location: '',
      image: '../image/Horror.png',
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    const userId = this.props.screenProps;

    await database.ref(`/users/${userId}`).on('value', snapshot => {
      const userDetails = snapshot.val();
      this.setState({ user: userDetails.name });
      console.log('USER DETAILS', userDetails);
    });

    /*  navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ location: position });
      },
      error => Alert.alert(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    ); */
    console.log('STATE OF PARENT COMPONENT', this.state);

    //if user is logged in, add to props
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
    if (whatElse === 'genre') {
      let genrePoster = dummyDataGenre.filter(movieGenre => {
        if (movieGenre[whatElse] === itemValue)
          return movieGenre.genrePosterURI;
      });
      this.setState({
        image: genrePoster[0].genrePosterURI,
        [whatElse]: itemValue,
      });
    } else {
      this.setState({ [whatElse]: itemValue });
    }
  }
  render() {
    return this.state.user ? (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <EventCard state={this.state} />
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerItem}
            selectedValue={this.state.genre}
            onValueChange={(itemValue, label, genrePoster) =>
              this.handleChange(itemValue, label, 'genre', genrePoster)
            }
          >
            <Picker.Item key="unselectable" label="genre" value={null} />
            {dummyDataGenre.map(event => (
              <Picker.Item
                key={event.id}
                label={event.genre}
                value={event.genre}
                genrePoster={HorrorPoster}
              />
            ))}
          </Picker>
          <Picker
            style={styles.pickerItem}
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
            style={styles.pickerItem}
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
          <Button
            style={{ margin: 40 }}
            mode="contained"
            onPress={this.handlePress}
          >
            submit
          </Button>
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: 'transparent', */
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60,
  },
  pickerContainer: {
    flex: 12,
    margin: 30,
  },
  pickerItem: {
    margin: 10,
    height: 130,
  },
});
