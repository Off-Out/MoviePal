import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { format } from 'date-fns';
import { auth } from '../firebase';
import { Location, Permissions } from 'expo';
import axios from 'axios';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: format(new Date(), 'YYYY-MM-DD'),
      latitude: null,
      longitude: null,
      movies: [],
      loading: true,
      userID: null,
    };

    //this.verifyAccount();
  }

  getLocationAndMovieAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Access denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/movies/showings?startDate=${
        this.state.date
      }&lat=${location.coords.latitude}&lng=-${
        location.coords.longitude
      }&imageSize=Sm&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );

    const sortedMovie = response.data.sort(function(a, b) {
      return a.releaseDate < b.releaseDate;
    });
    const { navigation } = this.props;
    const userID = navigation.getParam('userId');

    this.setState(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        movies: sortedMovie,
        userID: userID,
        loading: false,
      },
      () => {
        this.props.navigation.navigate('App', {
          state: 123,
        });
      }
    );
  };

  componentDidMount = async () => {
    await this.getLocationAndMovieAsync();
  };

  verifyAccount = () => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.props.navigation.navigate('App', { userId: user.uid });
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
