import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Item, Input, Button, Text, Body } from 'native-base';

import { material, iOSColors } from 'react-native-typography';
import { Card, Divider } from 'react-native-paper';
import { RkStyleSheet } from 'react-native-ui-kitten';

import { format } from 'date-fns';
import { connect } from 'react-redux';
import { fetchTheaters, fetchMovies } from '../redux/app-redux';
import { Location } from 'expo';

const styles = RkStyleSheet.create({
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    flex: 0.5
  }
});

const textStyles = StyleSheet.create({
  screenHeader: {
    fontSize: 34,
    letterSpacing: 5,
    color: '#aa1919',
    alignSelf: 'center',
    marginBottom: 10
  },
  movieTitle: {
    color: iOSColors.purple,
    ...material.robotoWeights,
    ...material.body2,
    maxWidth: Dimensions.get('window').width * (45 / 100),
    letterSpacing: 0.5
  },
  text: {
    color: iOSColors.purple,
    ...material.robotoWeights,
    ...material.body1,
    maxWidth: Dimensions.get('window').width * (45 / 100),
    letterSpacing: 0.5
  }
});

export class MovieScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      movieSearch: ''
    };
  }

  handleSearchChange = (stateField, text) => {
    this.setState({
      [stateField]: text
    });
  };

  zipCodeSubmit = async () => {
    const result = await Location.geocodeAsync(this.state.zipCode);
    this.props.fetchMovies(result[0].latitude, result[0].longitude);
    this.setState({ zipCode: '' });
  };

  fetchAndNavigate = (showtimes) => {
    const theaterArray = [];
    showtimes.forEach((theater) => theaterArray.push(theater.theatre.id));
    const uniqueTheaters = [...new Set(theaterArray)];
    this.props.fetchTheaters(uniqueTheaters);
    this.props.navigation.navigate('Map');
  };

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  render() {
    let movies = this.props.movies;

    if (!this.state.movieSearch && !this.state.zipCode) {
      movies = movies.sort(function(a, b) {
        return a.releaseDate < b.releaseDate;
      });
    }

    if (this.state.movieSearch) {
      movies = movies.filter(
        (movie) =>
          movie.title
            .toLowerCase()
            .indexOf(this.state.movieSearch.toLowerCase()) !== -1
      );
    }

    let preZipCode = '';

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 10 }}>
          <Text style={textStyles.screenHeader}> ALL MOVIES </Text>

          <View style={styles.filter}>
            <Item
              rounded
              style={
                (styles.item, { width: this.vw(47.5), height: this.vh(4) })
              }
            >
              <Input
                placeholder="Movie Search"
                onChangeText={(text) => {
                  this.handleSearchChange('movieSearch', text);
                }}
              />
            </Item>
            <Item
              rounded
              style={
                (styles.item, { width: this.vw(47.5), height: this.vh(4) })
              }
            >
              <Input
                placeholder="ZipCode"
                onChangeText={(text) => {
                  preZipCode = text;
                }}
              />
            </Item>
          </View>
          <Button
            rounded
            block
            light
            style={{
              marginTop: 5,
              width: this.vw(95),
              height: this.vh(4)
            }}
            onPress={() => {
              this.setState({ zipCode: preZipCode }, async () => {
                await this.zipCodeSubmit();
              });
            }}
          >
            <Text>Search</Text>
          </Button>
          <ScrollView>
            {movies.map((movie) => (
              <TouchableOpacity
                key={movie.tmsId}
                onPress={() => this.fetchAndNavigate(movie.showtimes)}
              >
                <Card
                  style={{
                    alignContent: 'center',
                    alignSelf: 'center',
                    width: this.vw(90),
                    height: this.vh(30),
                    borderWidth: 2,
                    borderColor: '#aa1919',
                    borderTop: true,
                    borderBottom: true,
                    elevation: 4,
                    margin: 10
                  }}
                >
                  <Card.Content flexDirection="row">
                    <View
                      style={{ marginRight: 5, justifyContent: 'space-evenly' }}
                    >
                      <Text style={textStyles.movieTitle}>{movie.title}</Text>
                      <Divider />
                      <Body>
                        <Text style={textStyles.text}>
                          {movie.shortDescription}
                        </Text>
                      </Body>
                      <Divider />
                      {movie.genres ? (
                        movie.genres.map((item, i) => (
                          <Text key={i} style={textStyles.text}>
                            {item}
                          </Text>
                        ))
                      ) : (
                        <Text>No genre information</Text>
                      )}

                      <Text style={textStyles.text}>
                        {format(movie.releaseDate, 'MM-DD-YYYY')}
                      </Text>
                    </View>
                    <View style={{ width: this.vw(45) }}>
                      <Card.Cover
                        style={{
                          maxWidth: Dimensions.get('window').width * (35 / 100)
                        }}
                        source={{
                          uri:
                            'http://developer.tmsimg.com/' +
                            movie.preferredImage.uri +
                            '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj'
                        }}
                      />
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude,
    movies: state.movies,
    theaters: state.theaters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTheaters: (theaterID) => dispatch(fetchTheaters(theaterID)),
    fetchMovies: (lat, long) => dispatch(fetchMovies(lat, long))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieScreen);
