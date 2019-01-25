import React, { Component } from 'react';
import { Picker, StyleSheet, View, Button } from 'react-native';
import MapView from 'react-native-maps';


export default class MapScreen extends Component {

  render() {

    return (
     <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.8781,
          longitude: -87.6298,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421

        }}
      />
    );
  }
}
