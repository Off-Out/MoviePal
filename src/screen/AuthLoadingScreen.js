import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import { setGeoLocation, setMovies } from '../redux/app-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.verifyAccount();
  }

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
    this.props.setGeoLocation(geoLocation);

    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/movies/showings?startDate=${
        this.props.date
      }&lat=${location.coords.latitude}&lng=-${
        location.coords.longitude
      }&imageSize=Sm&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );

    this.props.setMovies(response.data);
    // const { navigation } = this.props;
    // const userID = navigation.getParam('userId');

    this.setState(
      {
        loading: false,
      },
      () => {
        this.props.navigation.navigate('App');
      }
    );
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

  componentDidMount = async () => {
    await this.getLocationAndMovieAsync();
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
