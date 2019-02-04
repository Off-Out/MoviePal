import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
  ImageBackground
} from 'react-native';
// import { Button } from 'react-native-elements';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

export default class Trivia extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '¿ Trivia ?'
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

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  componentDidMount = async () => {
    const response = await axios.get(
      // `https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple`
      //only five questions for demo purposes
      `https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple`
    );
    let quiz = response.data.results;
    // console.log('quiz>>>>>', quiz);

    // the reason putting data.results is all about the trivia questions data structure which is coming from axios request
    this.setState({
      questions: quiz
    });
  };

  answerQuestion = (item) => {
    let increment = 0;

    if (item === this.state.questions[this.state.qno].correct_answer) {
      //increment += number will change based on how many questions
      increment += 100 / this.state.questions.length;
      this.setState({
        score: this.state.score + increment
      });
      // Alert.alert('¿ Trivia ?', 'You are correct!');
    }
    //else {
    //   Alert.alert(
    //     '¿ Trivia ?',
    //     `Nope!, correct answer is:
    //     ${this.state.questions[this.state.qno].correct_answer}`
    //   );
    // }
    if (this.state.qno === this.state.questions.length - 1) {
      this.setState({
        score: this.state.score + increment,
        isFinished: true
      });
    } else {
      this.setState({
        score: this.state.score + increment,
        qno: this.state.qno + 1
      });
    }
  };

  // if we want use next button
  // next = () => {
  //   if (this.state.qno === this.state.questions.length - 1) {
  //     this.setState({
  //       score: this.state.score,
  //       isFinished: true
  //     });
  //   } else {
  //     this.setState({
  //       qno: this.state.qno + 1
  //     });
  //   }
  // };

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

  onPressBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
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

    //converts html characters to javascript (using for the info coming from api)
    function convert(str) {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '')
        .replace(/&#039;/g, "'")
        .replace(/&Idquo;/g, ' ')
        .replace(/&rdquo;/g, ' ');
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
      singleQuestion = convert(currentQuestion.question);
    }

    if (!currentOptions || currentOptions.length === 0) {
      return <Text>...Loading</Text>;
    } else if (this.state.isFinished) {
      return (
        <View style={styles.container}>
          <View style={styles.circle}>
            {this.scoreMessage(this.state.score)}
          </View>
          <Button
            title="Play again"
            onPress={() => {
              this.setState({
                score: 0,
                qno: 0,
                questions: [],
                isFinished: false
              });
              this.componentDidMount();
            }}
          />
          <Button
            title="Search More Movies"
            onPress={() => this.onPressBack()}
          />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            resizeMode="cover"
            source={require('../image/questionPic.jpg')}
            style={{ width: '100%', height: '100%' }}
          >
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'flex-bottom',
                alignContent: 'center',
                alignItems: 'center'
              }}
            >
              <View style={{ flex: 2 }}>
                <Card
                  style={{
                    backgroundColor: 'white',
                    width: this.vw(75),
                    height: this.vh(70),
                    /*  alignItems: 'center', */
                    margin: 10,
                    marginTop: 50,
                    marginBottom: 50
                  }}
                  elevation={4}
                >
                  <Card.Content>
                    <Title
                      style={{
                        alignSelf: 'center',
                        color: 'red',
                        fontStyle: 'italic'
                      }}
                      numberOfLines={1}
                    >
                      {' '}
                      Question {this.state.qno + 1}
                    </Title>
                    <Paragraph
                      style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        marginTop: 30,
                        fontStyle: 'italic'
                      }}
                      numberOfLines={7}
                    >
                      {singleQuestion}
                    </Paragraph>
                  </Card.Content>
                  <Card.Actions
                    style={{
                      flex: 0.5,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 50,
                      marginBottom: 50
                    }}
                  >
                    {currentOptions.map((item, i) => (
                      <Chip
                        key={i}
                        style={{ margin: 20 }}
                        onPress={() => this.answerQuestion(item)}
                      >
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 15,
                            fontStyle: 'italic'
                          }}
                          numberOfLines={3}
                        >
                          {convert(item)}{' '}
                        </Text>
                      </Chip>
                    ))}
                  </Card.Actions>

                  {/* <Button
                    buttonStyle={{ backgroundColor: 'lightgreen' }}
                    title="Next"
                    onPress={() => this.next()}
                  /> */}
                </Card>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );
    }
  }
}

const scoreCircleSize = 300;
const styles = StyleSheet.create({
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
  }
});
