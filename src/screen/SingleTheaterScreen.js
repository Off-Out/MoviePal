import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Form, Item, Picker, Card, CardItem, Body, Content } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays } from 'date-fns';
import axios from 'axios';

export default class SingleTheaterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'THEATER DETAILS',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
      theater: [],
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const theatre = navigation.getParam('theatre', null);
    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres/${
        theatre.theatreId
      }/showings?startDate=${
        this.state.selectedDate
      }&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );

    this.setState({
      theater: response.data,
    });
  };
  onValueChange2 = async value => {
    this.setState({
      selectedDate: value,
    });
    const { navigation } = this.props;
    const theatre = navigation.getParam('theatre', null);
    const response = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres/${
        theatre.theatreId
      }/showings?startDate=${
        this.state.selectedDate
      }&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );

    this.setState({
      theater: response.data,
    });
  };

  render() {
    const { navigation } = this.props;

    const theatre = navigation.getParam('theatre', null);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          <View style={{ flex: 1 }}>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholder={`${format(new Date(), 'YYYY-MM-DD')}`}
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
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

            <Card>
              <CardItem>
                <Body>
                  <Text>{theatre.name}</Text>
                  <Text>{`${theatre.location.address.street} ${
                    theatre.location.address.city
                  }, ${theatre.location.address.state}`}</Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
                <Body>
                  <Text>SHOWTIMES</Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
                <Body>
                  {this.state.theater.map(movie => (
                    <TouchableOpacity
                      key={movie.tmsId}
                      onPress={() =>
                        navigation.navigate('SingleEvent', {
                          movie,
                        })
                      }
                    >
                      <Text>{movie.title}</Text>
                      <Text>{movie.releaseDate}</Text>
                      <Text>{movie.genres}</Text>
                      <Text>{movie.audience}</Text>
                    </TouchableOpacity>
                  ))}
                </Body>
              </CardItem>
            </Card>
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
