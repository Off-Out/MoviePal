import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'native-base'
import { Container } from 'native-base';
import { LoginForm } from '../component';
import SignUpScreen from './SignUpScreen'
import { auth, database } from '../firebase';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '123456',
    };
  }

  handleUserInput = (stateField, text) => {
    this.setState({
      [stateField]: text,
    });
  };


  login = async (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(result => this.props.navigation.navigate('App', {userId: result.user.uid}))
      .catch(error => Alert.alert(error.message));
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../image/epLogo.png')} />
        <LoginForm handleUserInput={this.handleUserInput} login={this.login} credential={this.state}/>
        <View style={styles.button}>
        <Button
          transparent
          danger
          onPress={() =>
            this.props.navigation.navigate("SignUpScreen")
          }
        >
          <Text style={{fontSize: 15}}>CREATE ACCOUNT</Text>
        </Button>
        <Button
          transparent
          danger
          onPress={() => {
            if (!this.state.email) {
              Alert.alert('Please enter your email')
            }
            else  {
              auth.sendPasswordResetEmail(this.state.email)
              .then(() => Alert.alert('Reset Password Email Sent!'))
            }
          }}
        >
          <Text style={{fontSize: 15}}>FORGOT PASSWORD?</Text>
        </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  image: {
    alignSelf: 'center',
    marginTop: 50,
  },
  button: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    fontSize: 15,
  }
});

export default LoginScreen;
