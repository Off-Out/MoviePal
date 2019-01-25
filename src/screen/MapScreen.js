import React, { Component } from 'react';
import { Picker, StyleSheet, View, Button } from 'react-native';

let events = [
  {
    name: 'Sport & Outdoor',
    subcategories: ['Hiking', 'Gym', 'Picnic', 'Boxing'],
  },
  { name: 'Shopping', subcategories: ['Local Market', 'Outlet'] },
  { name: 'Arts & Crafts', subcategories: ['Paint', 'Sewing', 'Poetry'] },
  { name: 'Fitness & Wellness', subcategories: ['Yoga', 'Meditation'] },
  { name: 'Foodventure', subcategories: ['Thai', 'Mediterranean'] },
  { name: 'Local Discoveries', subcategories: ['Walking Tour', 'Museums'] },
  { name: 'Entertainment', subcategories: ['Movie', 'Coffee', 'Theater'] },
  { name: 'Create your own', subcategories: ['It is all up to you!'] },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
});

export default class MapScreen extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     PickerSelectedVal: '';
  //   }
  // }
  // getSelectedPickerValue = () => {
  //   Alert.alert('I want to do this ' + this.state.PickerSelectedVal + ' today.')
  // }
  render() {
    // let category = events.map(item => {
    //   return item.name;
    // });
    // let subcategory = events.map(item => {
    //   return item.subcategories.map(sub => {
    //     return sub;
    //   });
    // });
    return (
      <View styles={styles.container}>
        {events.map(event => {
          return (
            <Picker key={event.name} selectedValue={event.name}>
              {event.subcategories.map(item => {
                return <Picker.Item key={item} label={item} value={item} />;
              })}
            </Picker>
          );
        })}
        <Button title="I want to do" onPress={this.category} />
      </View>
    );
  }
}
