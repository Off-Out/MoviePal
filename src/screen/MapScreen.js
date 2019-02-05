import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchSingleTheaterMovies } from '../redux/app-redux';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
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

  componentDidMount = async () => {};

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, zIndex: -1 }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsMyLocationButton={true}
        >
          {this.props.theaters.map(marker => (
            <Marker
              key={marker.theatreId}
              coordinate={{
                latitude: parseFloat(marker.location.geoCode.latitude),
                longitude: parseFloat(marker.location.geoCode.longitude),
              }}
              title={marker.name}
              description={marker.location.address.street}
              onPress={() => {
                this.props.fetchSingleTheaterMovies(
                  marker.theatreId,
                  this.props.date
                );
                this.props.navigation.navigate('SingleTheater', {
                  theatre: marker,
                });
              }}
            />
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    theaters: state.theaters,
    latitude: state.latitude,
    longitude: state.longitude,
    date: state.date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleTheaterMovies: (theaterID, date) =>
      dispatch(fetchSingleTheaterMovies(theaterID, date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
