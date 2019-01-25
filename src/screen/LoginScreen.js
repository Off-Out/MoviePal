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
      <Container style={styles.container}>
        <View style={styles.image}>
          <Image source={require('../image/epLogo.png')} />
        </View>
        <View style={styles.formContainer}>
          <LoginForm handleUserInput={this.handleUserInput} login={this.login} credential={this.state}/>
          {/* <SignUpSection
            createUserAccount={this.createUserAccount}
            login={this.login}
            credential={this.state}
            placeholder={this.state.email}
          /> */}
        <Button
          transparent
          danger
          onPress={() =>
            // console.log("hellos");
            this.props.navigation.navigate("SignUpScreen")
          }
        >
          <Text style={styles.text}>CREATE ACCOUNT</Text>
        </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  formContainer: {
    flex: 1,

  },
});

export default LoginScreen;
