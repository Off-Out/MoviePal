import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { Form, Item, Picker, Body, H2, Text, Input } from 'native-base';
import { material, iOSColors } from 'react-native-typography';
import { Card, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays } from 'date-fns';

import { connect } from 'react-redux';

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
  theaterTitle: {
    color: iOSColors.black,
    ...material.robotoWeights,
    ...material.title3Emphasized,
    maxWidth: Dimensions.get('window').width * 100,
    letterSpacing: 0.5
  },
  text: {
    color: iOSColors.purple,
    ...material.robotoWeights,
    ...material.body1,
    maxWidth: Dimensions.get('window').width * 100,
    letterSpacing: 0.5
  }
});

class SingleTheaterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Theater Details'
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
      movieSearch: ''
    };
  }

  componentDidMount = () => {};

  onSearchTextChange = (stateField, text) => {
    this.setState({
      [stateField]: text
    });
  };
  onValueChange2 = (value) => {
    this.setState({
      selectedDate: value
    });
    try {
      console.log('onValueChange');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const movies = this.props.singleTheaterMovies;
    console.log('look for this', movies);
    let searchMovie = movies.filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .indexOf(this.state.movieSearch.toLowerCase()) !== -1
    );

    const { navigation } = this.props;
    const theatre = navigation.getParam('theatre', null);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Card>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Ionicons name="ios-arrow-dropdown" />}
                  placeholder={`Date: ${format(new Date(), 'YYYY-MM-DD')}`}
                  placeholderStyle={{ color: 'black' }}
                  selectedValue={this.state.selectedDate}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item
                    label={format(addDays(new Date(), 1), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 1), 'YYYY-MM-DD')}
                  />
                  <Picker.Item
                    label={format(addDays(new Date(), 2), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 2), 'YYYY-MM-DD')}
                  />
                  <Picker.Item
                    label={format(addDays(new Date(), 3), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 3), 'YYYY-MM-DD')}
                  />
                  <Picker.Item
                    label={format(addDays(new Date(), 4), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 4), 'YYYY-MM-DD')}
                  />
                  <Picker.Item
                    label={format(addDays(new Date(), 5), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 5), 'YYYY-MM-DD')}
                  />
                  <Picker.Item
                    label={format(addDays(new Date(), 6), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 6), 'YYYY-MM-DD')}
                  />
                  <Picker.Item
                    label={format(addDays(new Date(), 7), 'YYYY-MM-DD')}
                    value={format(addDays(new Date(), 7), 'YYYY-MM-DD')}
                  />
                </Picker>
              </Item>
            </Form>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <H2>{theatre.name}</H2>
                <Text>
                  {`${theatre.location.address.street} ${
                    theatre.location.address.city
                  }, ${theatre.location.address.state}`}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Input
                    placeholder="Search for movie"
                    onChangeText={(text) => {
                      this.onSearchTextChange('movieSearch', text);
                    }}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <H2>In Theater</H2>
          </View>
          <ScrollView>
            {searchMovie.map((movie) => (
              <TouchableOpacity
                key={movie.tmsId}
                onPress={() =>
                  this.props.navigation.navigate('SingleMovie', {
                    movie,
                    theatre: theatre.name
                  })
                }
              >
                <Card>
                  <CardItem>
                    <Body>
                      <Text value={movie}>{movie.title}</Text>
                      <Text>{movie.releaseDate}</Text>
                      <Text>{movie.genres ? movie.genres[0] : null}</Text>
                      <Text>{movie.audience}</Text>
                    </Body>
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

const mapStateToProps = (state) => {
  return {
    singleTheaterMovies: state.singleTheaterMovies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTheaterScreen);
