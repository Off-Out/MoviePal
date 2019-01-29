import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { SignUpScreen } from '../screen';
import { LoginForm } from '../component';
import { withNavigation } from 'react-navigation';

import firebase, { auth, database } from '../firebase';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleUserInput = (stateField, text) => {
    this.setState({
      [stateField]: text,
    });
  };

  login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(result =>
        this.props.navigation.navigate('App', { userId: result.user.uid })
      )
      .catch(error => Alert.alert(error.message));
  };

  signInWithGoogle = () => {
    Expo.Google.logInAsync({
      androidClientId:
        '963629551224-0iocmkcve8i96rbg244m91mj5tvmflto.apps.googleusercontent.com',
      iosClientId:
        '963629551224-iivt1efj479sg2ucve5bjsdrm8ng3b75.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    })
      .then(result => {
        if (result.type === 'success') {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            result.idToken,
            result.accessToken
          );
          const user = auth.signInAndRetrieveDataWithCredential(credential);
          return user;
        } else {
          return { cancelled: true };
        }
      })
      .then(() => {
        const user = auth.currentUser;
        database.ref(`users/${user.uid}`).set({
          name: user.displayName,
          email: user.email,
        });
        this.props.navigation.navigate('App', { userId: user.uid });
      })
      .catch(error => console.error(error));
  };

  signInWithFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '367646357383853',
      { permissions: ['public_profile', 'email'] }
    );
    console.log('token', token);
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const user = auth.signInAndRetrieveDataWithCredential(credential);
      console.log('user', user);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginForm
          handleUserInput={this.handleUserInput}
          login={this.login}
          credential={this.state}
          signInWithGoogle={this.signInWithGoogle}
          signInWithFacebook={this.signInWithFacebook}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
