import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Item, Input, Button, Text, Card, CardItem, Body } from 'native-base';
import { RkStyleSheet } from 'react-native-ui-kitten';
import { scaleVertical } from '../utility/duc';
import { Location, Permissions } from 'expo';
import { format } from 'date-fns';
import axios from 'axios';
import { connect } from 'react-redux';

export class MovieScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: format(new Date(), 'YYYY-MM-DD'),
      zipCode: null,
      latitude: null,
      longitude: null,
      movies: [],
      movieSearch: '',
      loading: false,
    };
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

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      movies: sortedMovie,
      loading: false,
    });
  };

  componentDidMount = async () => {
    //await this.getLocationAndMovieAsync();
  };

  handleSearchChange = (stateField, text) => {
    this.setState({
      [stateField]: text,
    });
  };

  render() {
    const movies = this.state.movies;
    console.log(this.props.latitude);
    console.log(this.props.longitude);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.filter}>
            <Item rounded style={styles.item}>
              <Input
                placeholder="Movie Search"
                onChangeText={text => {
                  this.handleSearchChange('movieSearch', text);
                }}
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                placeholder="ZipCode"
                onChangeText={text => {
                  this.handleSearchChange('movieSearch', text);
                }}
              />
            </Item>
          </View>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView style={styles.content}>
              {movies.map(movie => (
                <TouchableOpacity key={movie.tmsId}>
                  <Card>
                    <CardItem header bordered>
                      <Text>{movie.title}</Text>
                    </CardItem>
                    <CardItem bordered cardBody>
                      <Image
                        source={{
                          uri:
                            'http://developer.tmsimg.com/' +
                            movie.preferredImage.uri +
                            '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                        }}
                        style={{ width: 120, height: 180 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Text>{format(movie.releaseDate, 'MM-DD-YYYY')}</Text>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = RkStyleSheet.create({
  container: {
    padding: scaleVertical(10),
    flex: 1,
    justifyContent: 'space-between',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    latitude: state.latitude,
    longitude: state.longitude,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieScreen);
