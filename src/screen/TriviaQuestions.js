import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Quiz extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'MOVIE QUIZ',
    };
  };
  constructor(props) {
    super(props);
    this.score = 0;
    this.state = {
      quiz: [],
    }
  }

  componentDidMount = async () => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=20&category=11&type=multiple`
    );
    this.setState({
      quiz: response.data,
    });
  };

  render() {
    console.log('what is our current state >>>', this.state.quiz.results)
    console.log(typeof this.state.quiz.results)
    return (
      <View style={{ flex: 1 }}>
        <Text>I will do something</Text>
        {/* {this.state.quiz.map((item, i) => { return (<Title>{item.correct_answer}</Title>) })} */}


      </View>
    )
  }
}
