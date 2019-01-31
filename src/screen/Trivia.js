// https://opentdb.com/api.php?amount=20&category=11&type=multiple

import React, { Component } from 'react';
import Trivia from './TriviaQuestions';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quizFinish: false,
      score: 0
    }
  }
  onPressBack = () => {
    const { goBack } = this.props.navigation
    goBack()
  }
  getScore = (score) => {
    this.setState({ quizFinish: true, score: score })
  }
  scoreMessage = (score) => {
    if (score <= 30) {
      return (<View style={styles.innerContainer} >
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>Can be better,try again!</Text>
        <Text style={styles.score}>You scored {score}%</Text>
      </View>)
    } else if (score > 30 && score < 60) {
      return (<View style={styles.innerContainer} >
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>Good job!</Text>
        <Text style={styles.score}>Congrats you scored {score}% </Text>
      </View>)
    } else if (score >= 60) {
      return (<View style={styles.innerContainer}>
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>Wow! You are on fire!</Text>
        <Text style={styles.score}>Congrats you scored {score}% </Text>
      </View>)
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.onPressBack()}><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
          <Text style={styles.toolbarTitle}></Text>
          <Text style={styles.toolbarButton}></Text>
        </View>

        {this.state.quizFinish ? <View style={styles.container}>
          <View style={styles.circle}>

            {this.scoreMessage(this.state.score)}
          </View>

        </View> : <Trivia quizFinish={(score) => this.getScore(score)} />}

      </View>
    );
  }
}
const scoreCircleSize = 300
const styles = StyleSheet.create({
  score: {
    color: "white",
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: "green"
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#81c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarButton: {
    width: 55,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
});
