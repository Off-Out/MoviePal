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
        <Button
          transparent
          danger
          onPress={() =>
            this.props.navigation.navigate("SignUpScreen")
          }
        >
          <Text>CREATE ACCOUNT</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center"
  },
  loginContainer: {
    flex: 1,
    margin: 13,
    top: 30
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default LoginScreen;
