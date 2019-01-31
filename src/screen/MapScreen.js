import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Search } from '../component';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '60606',
      theaters: [],
    };
  }

  static navigationOptions = ({ navigation, tintColor }) => {
    const theaters = navigation.getParam('theaters');

    return {
      headerTitle: 'Map',
      headerRight: (
        <Ionicons
          name="ios-list-box"
          style={{ marginRight: 10 }}
          size={24}
          onPress={() =>
            navigation.navigate('ListScreen', {
              theaters,
            })
          }
        />
      ),
    };
  };

  componentDidMount = async () => {
    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres?zip=${
      this.state.zipCode
      }&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );
    this.props.navigation.setParams({
      theaters: response.data,
    });
    this.setState({
      theaters: response.data,
    });
  };

  handleZipCodeChange = text => {
    this.setState({
      zipCode: text,
    });
  };

  handleZipCodeSubmit = async () => {
    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres?zip=${
      this.state.zipCode
      }&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );
    this.setState({
      theaters: response.data,
    });
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
              coordinate={{
                latitude: parseFloat(marker.location.geoCode.latitude),
                longitude: parseFloat(marker.location.geoCode.longitude),
              }}
              title={marker.name}
              description={marker.location.address.street}
              onPress={() =>
                this.props.navigation.navigate('SingleTheater', {
                  theatre: marker,
                })
              }
            />
          ))}
        </MapView>
        <Search
          handleZipCodeChange={this.handleZipCodeChange}
          handleZipCodeSubmit={this.handleZipCodeSubmit}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
