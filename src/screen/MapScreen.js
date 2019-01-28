import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Search } from '../component';
import axios from 'axios';

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Map',
    headerRight: (
      <Button title="List" onPress={() => navigation.navigate('ListScreen')} />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      zipCode: '60606',
      theaters: [],
    };
  }

  componentDidMount = async () => {
    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres?zip=${
        this.state.zipCode
      }&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );
    this.setState(
      {
        theaters: response.data,
      },
      () => {
        console.log(this.state.theaters);
      }
    );
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, zIndex: -1 }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: 41.881832,
            longitude: -87.623177,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsMyLocationButton={true}
        >
          {this.state.theaters.map(marker => (
            <Marker
              key={marker.theatreId}
              coordinate={marker.location.geoCode}
              title={marker.Name}
              description={marker.location.address.street}
            />
          ))}
        </MapView>
        <Search />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
