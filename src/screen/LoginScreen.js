import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Container } from 'native-base';
import { SignUpSection, LoginForm } from '../component';
import { auth, database } from '../firebase';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'gracehopper@eventpal.com',
      password: '123456',
    };
  }

  handleUserInput = (stateField, text) => {
    this.setState({
      [stateField]: text,
    });
  };

  createUserAccount = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        database.ref(`users/${user.user.uid}`).set({ email })
        this.props.navigation.navigate('App', {userId: user.user.uid})
      })
      .catch(error => Alert.alert(error.message));
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
          <LoginForm handleUserInput={this.handleUserInput} />
          <SignUpSection
            createUserAccount={this.createUserAccount}
            login={this.login}
            credential={this.state}
          />
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
