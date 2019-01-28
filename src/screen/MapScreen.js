import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Search from '../component/Search';

export default class MapScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Search />
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
