import React, { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Item, Input, Button, Text, Card, CardItem, Body } from 'native-base';
import { RkStyleSheet } from 'react-native-ui-kitten';
import { scaleVertical } from '../utility/duc';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { fetchTheaters } from '../redux/app-redux';
import axios from 'axios';

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

  handleSearchChange = (stateField, text) => {
    this.setState({
      [stateField]: text,
    });
  };

  zipCodeSubmit = () => {};

  fetchAndNavigate = showtimes => {
    const theaterArray = [];
    showtimes.forEach(theater => theaterArray.push(theater.theatre.id));
    const uniqueTheaters = [...new Set(theaterArray)];
    this.props.fetchTheaters(uniqueTheaters);
    console.log(this.props.navigation.navigate('Map'));
  };

  render() {
    const movies = this.props.movies;
    const sortedMovie = movies.sort(function(a, b) {
      return a.releaseDate < b.releaseDate;
    });

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
            {movies.map(movie => (
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
  return { fetchTheaters: theaterID => dispatch(fetchTheaters(theaterID)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieScreen);
