import React from 'react';
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

const dummyDataCategory = [
  { category: 'Entertainment', id: 1 },
  { category: 'Sports', id: 2 },
  { category: 'Food', id: 3 },
  { category: 'Bars/Night', id: 4 },
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

const SingleEvent = () => {
  return (
    <View
      styles={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-bottom',
        alignContent: 'center',
      }}
    >
      <Title />
      <EventCard styles={{ flex: 2 }} />
    </View>
  );
};

export default SingleEvent;
