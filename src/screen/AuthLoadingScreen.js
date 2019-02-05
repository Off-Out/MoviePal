import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setGeoLocation,
  setMovies,
  fetchNearbyTheaters,
} from '../redux/app-redux';

class AuthLoadingScreen extends React.Component {
  getLocationAndMovieAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Access denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    const geoLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    this.props.fetchNearbyTheaters(geoLocation.latitude, geoLocation.longitude);

    this.props.setGeoLocation(geoLocation);

    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/movies/showings?startDate=${
        this.props.date
      }&lat=${location.coords.latitude}&lng=${
        location.coords.longitude
      }&imageSize=Sm&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );

    this.props.setMovies(response.data);
  };

  verifyAccount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('App', { userId: user.uid });
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  componentDidMount = async () => {
    await this.getLocationAndMovieAsync();
    this.verifyAccount();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: state.date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGeoLocation: location => dispatch(setGeoLocation(location)),
    setMovies: movies => dispatch(setMovies(movies)),
    fetchNearbyTheaters: (lat, long) =>
      dispatch(fetchNearbyTheaters(lat, long)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
