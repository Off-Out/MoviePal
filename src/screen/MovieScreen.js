import React, { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Item, Input, Button, Text, Card, CardItem, Body } from 'native-base';
import { RkStyleSheet } from 'react-native-ui-kitten';
import { scaleVertical } from '../utility/duc';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { fetchTheaters, fetchMovies } from '../redux/app-redux';
import { Location } from 'expo';
const styles = RkStyleSheet.create({
  container: {
    padding: scaleVertical(10),
    flex: 1,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13,
  },
});

export class MovieScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      movieSearch: '',
    };
  }

  componentDidMount = async () => {};

  zipCodeSubmit = async () => {
    const result = await Location.geocodeAsync(this.state.zipCode);
    console.log('lat', result[0].latitude);
    console.log('lat', result[0].longitude);
    this.props.fetchMovies(result[0].latitude, result[0].longitude);
    this.setState({ zipCode: '' });
  };

  fetchAndNavigate = showtimes => {
    const theaterArray = [];
    showtimes.forEach(theater => theaterArray.push(theater.theatre.id));
    const uniqueTheaters = [...new Set(theaterArray)];
    this.props.fetchTheaters(uniqueTheaters);
    this.props.navigation.navigate('Map');
  };

  render() {
    const movies = this.props.movies;
    const sortedMovie = movies.sort(function(a, b) {
      return a.releaseDate < b.releaseDate;
    });

    const searchedMovie = sortedMovie.filter(
      movie =>
        movie.title
          .toLowerCase()
          .indexOf(this.state.movieSearch.toLowerCase()) !== -1
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.filter}>
            <Item rounded style={styles.item}>
              <Input
                placeholder="Movie Search"
                autoCorrect={false}
                onChangeText={text => {
                  this.setState({ movieSearch: text });
                }}
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                placeholder="ZipCode"
                autoCorrect={false}
                onChangeText={text => {
                  this.setState({ zipCode: text });
                }}
              />
            </Item>
          </View>
          <Button
            rounded
            block
            light
            style={{ marginTop: 5 }}
            onPress={() => {
              this.zipCodeSubmit();
            }}
          >
            <Text>Search</Text>
          </Button>
          <ScrollView>
            {searchedMovie.map(movie => (
              <TouchableOpacity
                key={movie.tmsId}
                onPress={() => this.fetchAndNavigate(movie.showtimes)}
              >
                <Card>
                  <CardItem header>
                    <Text>{movie.title}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{movie.shortDescription}</Text>
                    </Body>
                  </CardItem>
                  <CardItem footer style={{ justifyContent: 'space-between' }}>
                    <Text>{format(movie.releaseDate, 'MM-DD-YYYY')}</Text>
                    <Text>{movie.audience}</Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    latitude: state.latitude,
    longitude: state.longitude,
    movies: state.movies,
    theater: state.theater,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTheaters: theaterID => dispatch(fetchTheaters(theaterID)),
    fetchMovies: (lat, long) => dispatch(fetchMovies(lat, long)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieScreen);
