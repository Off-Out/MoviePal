import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Alert, Picker } from 'react-native';

const dummyDataCategory = [
  { category: 'Entertainment', id: 1 },
  { category: 'Sports', id: 2 },
  { category: 'Food', id: 3 },
  { category: 'Bars/Night', id: 4 },
];
const dummyDataTime = [
  { morning: 'morning', id: 1 },
  { afternoon: 'afternoon', id: 2 },
  { evening: 'evening', id: 3 },
  { afterHours: 'after hours', id: 4 },
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
      category: '',
      time: '',
      location: '',
    };
  }
  handlePress() {
    Alert.alert('COOL THINGS HAPPENING HERE!');
  }
  handleChange(event) {
    this.setState({ [event.value]: event.label });
    //thunk action here to add to db
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.picker}>
          <Text style={StyleSheet.title}>Hey, PAL!</Text>
          <Text>what do you want to do today?</Text>

          {/* category picker */}
          <Picker
            selectedValue={this.state.category}
            style={styles.picker}
            onValueChange={this.handleChange}
            value="category"
          >
            {dummyDataCategory.map(event => (
              <Picker.Item key={event.id} label={event} value="category" />
            ))}
          </Picker>

          {/* time picker */}
          <Picker
            selectedValue={this.state.time}
            style={styles.picker}
            onValueChange={this.handleChange}
            value="time"
          >
            {dummyDataTime.map(time => (
              <Picker.Item key={time.id} label={time} value="time" />
            ))}
          </Picker>

          {/* location picker */}
          <Picker
            selectedValue={this.state.location}
            style={styles.picker}
            onValueChange={this.handleChange}
          >
            {dummyDataLocation.defaultLocation ? (
              <Picker.Item
                label={dummyDataLocation.defaultLocation}
                value="location"
              />
            ) : (
              <Picker.Item
                key={event.id}
                label="users current location"
                value="location"
              />
            )}

            {dummyDataLocation.previousLocations
              ? dummyDataLocation.previousLocations.map(event => (
                  <Picker.Item key={event.id} label={event} value="location" />
                ))
              : null}
          </Picker>
        </View>
        <Button onPress={this.handlePress} title="events" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    justifyContent: 'space-between',
  },
});
