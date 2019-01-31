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
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
let quiz = [];

export default class Trivia extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'MOVIE QUIZ'
    };
  };
  constructor(props) {
    super(props);
    this.score = 0;
    this.qno = 0;
    this.state = {
      question: '',
      options: [],
      correct_answer: '',
      countCheck: 0
    };
  }

  componentDidMount = async () => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=20&category=11&type=multiple`
    );
    let quiz = response.data.results;
    // the reason putting data.results is all about the trivia questions data structure which is coming from axios request
    this.setState({
      question: quiz[this.qno].question,
      options: [
        ...quiz[this.qno].incorrect_answers,
        quiz[this.qno].correct_answer
      ],
      correct_answer: quiz[this.qno].correct_answer
    });
  };

  // next = () => {
  //   if (this.qno < quiz.length - 1) {
  //     this.qno++
  //     this.setState({
  //       countCheck: 0,
  //       question: quiz[this.qno].question,
  //       options: [...quiz[this.qno].incorrect_answers, quiz[this.qno].correct_answer],
  //       correct_answer: quiz[this.qno].correct_answer,
  //     })
  //   } else {
  //     this.props.getScore(this.score * 100 / 20)
  //   }
  // }

  // answerQuestion = (status, answer) => {
  //   if (status === true) {
  //     const count = this.state.countCheck + 1;
  //     this.setState({ countCheck: count })
  //     if (answer === this.state.correct_answer) {
  //       this.score += 1
  //     }
  //   } else {
  //     const count = this.state.countCheck - 1;
  //     this.setState({ countCheck: count })
  //     if (this.state.countCheck < 1 || answer !== this.state.correct_answer) {
  //       this.score -= 1
  //     }
  //   }
  // }

  render() {
    // console.log('what is our current state >>>', this.state.quiz.results)
    // console.log(typeof this.state.quiz.results)
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
    let currentOptions = this.state.options;
    currentOptions = shuffle(currentOptions);
    console.log('what is my current options', currentOptions);

    // console.log('what is the answer', this.props.answerQuestion);

    if (!currentOptions || currentOptions === []) {
      return <Text>...Loading</Text>;
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
                <Text style={styles.welcome}>{this.state.question}</Text>
              </View>

              <View>
                {currentOptions.map((item, i) => (
                  <View key={i} style={styles.questions}>
                    <Text style={styles.welcome}>{currentOptions[i]} </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        // <SafeAreaView style={{ backgroundColor: '#1d4c7f', paddingTop: 10 }}>
        //   <View style={styles.container}>

        //     <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>

        //       <View style={styles.oval} >
        //         <Text style={styles.welcome}>
        //           {this.state.question}
        //         </Text>
        //       </View>
        //       <View>
        //         {currentOptions.map((item, i) => (<View key={i} style={{ margin: 10 }}>

        //           <Button countCheck={this.state.countCheck} onColor={"skyblue"} title='this is option button'>
        //             <Text>{currentOptions[i]} </Text> </Button>
        //         </View>))
        //         }
        //         {/* onPress={(status) => this.props.answerQuestion(status, item)}  */}
        //       </View>

        //       <View style={{ flexDirection: "row" }}>

        //         <TouchableOpacity onPress={() => this.next()} >
        //           <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "darkblue" }}>
        //             <Icon name="md-arrow-round-forward" size={30} color="white" />
        //           </View>
        //         </TouchableOpacity >

        //       </View>
        //     </View>
        //   </View>
        // </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  oval: {
    width: (width * 90) / 100,
    borderRadius: 20,
    backgroundColor: 'skyblue'
  },
  container: {
    flex: 1,
    alignItems: 'center'
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
  }
});
