import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
// let quiz = [];

export default class Trivia extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'MOVIE QUIZ'
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      qno: 0,
      questions: [],
      isFinished: false
    };
  }

  componentDidMount = async () => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=20&category=11&type=multiple`
    );
    let quiz = response.data.results;
    console.log('quiz>>>>>', quiz);

    // the reason putting data.results is all about the trivia questions data structure which is coming from axios request
    this.setState({
      questions: quiz
    });
  };

  answerQuestion = (item) => {
    let increment = 0;

    if (item === this.state.questions[this.state.qno].correct_answer) {
      increment += 5;
    }
    if (this.state.qno === this.state.questions.length - 1) {
      this.setState({
        score: this.state.score,
        isFinished: true
      });
    } else {
      this.setState({
        score: this.state.score + increment,
        qno: this.state.qno + 1
      });
    }
  };

  scoreMessage = (score) => {
    if (this.state.score <= 30) {
      return (
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={styles.score}>Can be better,try again!</Text>
          <Text style={styles.score}>You scored {this.state.score}%</Text>
        </View>
      );
    } else if (this.state.score > 30 && this.state.score < 60) {
      return (
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={styles.score}>Good job!</Text>
          <Text style={styles.score}>
            Congrats you scored {this.state.score}%{' '}
          </Text>
        </View>
      );
    } else if (this.state.score >= 60) {
      return (
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={styles.score}>Wow! You are on fire!</Text>
          <Text style={styles.score}>
            Congrats you scored {this.state.score}%{' '}
          </Text>
        </View>
      );
    }
  };

  render() {
    // because of the structure of the data , if I am not shuffle the order of array, the correct answer always be the last option
    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    let currentOptions = [];
    let currentQuestion = this.state.questions[this.state.qno];
    let singleQuestion;

    if (this.state.questions.length) {
      currentOptions = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer
      ];
      currentOptions = shuffle(currentOptions);
      singleQuestion = currentQuestion.question;
    }

    if (!currentOptions || currentOptions.length === 0) {
      return <Text>...Loading</Text>;
    } else if (this.state.isFinished) {
      return (
        <View style={styles.container}>
          <View style={styles.circle}>
            {this.scoreMessage(this.state.score)}
          </View>
        </View>
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: 'lightblue', paddingTop: 10 }}>
          <View style={styles.container}>
            <Title> Here you go!</Title>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View style={styles.oval}>
                <Text>{singleQuestion}</Text>
              </View>

              <View>
                {currentOptions.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.questions}
                    onPress={() => this.answerQuestion(item)}
                  >
                    <Text style={styles.welcome}>{item} </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
const scoreCircleSize = 300;
const styles = StyleSheet.create({
  oval: {
    width: (width * 90) / 100,
    borderRadius: 20,
    backgroundColor: 'skyblue'
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  questions: {
    width: (width * 80) / 100,
    borderRadius: 15,
    backgroundColor: 'darkblue'
  },
  score: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: 'lightgreen'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#F5FCFF'
  }
});
