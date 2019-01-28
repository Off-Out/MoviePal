import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'native-base'
import { Container } from 'native-base';
import { LoginForm } from '../component';
import SignUpScreen from './SignUpScreen';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
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


  login = async (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(result => this.props.navigation.navigate('App', {userId: result.user.uid}))
      .catch(error => Alert.alert(error.message));
  };

  signInWithGoogle = () => {
    Expo.Google.logInAsync({
        androidClientId: "963629551224-0iocmkcve8i96rbg244m91mj5tvmflto.apps.googleusercontent.com",
        iosClientId: "963629551224-iivt1efj479sg2ucve5bjsdrm8ng3b75.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      .then(result => {
        if (result.type === 'success') {
          const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
          const user = auth.signInAndRetrieveDataWithCredential(credential);
          return user
        }
        else return {cancelled: true}
      })
      .then(() => {
        const user = auth.currentUser;
        database.ref(`users/${user.uid}`).set({
          name: user.displayName,
          email: user.email,
          // photo: user.photoUrl
        })
        this.props.navigation.navigate('App', {userId: user.uid})
      })
      .catch(error => console.error(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../image/epLogo.png')} />
        <LoginForm handleUserInput={this.handleUserInput} login={this.login} credential={this.state}/>
          {/* <View style={styles.button}> */}
        <Button
         block
          success
          style={{marginBottom: 10}}
          onPress={() => this.signInWithGoogle()}
        >
          <Text>SIGN-IN WITH GOOGLE</Text>
        </Button>
        <Button
         block
          primary
          style={{marginBottom: 10}}
          onPress={() => this.signInWithGoogle()}
        >
          <Text>SIGN-IN WITH FACEBOOK</Text>
        </Button>
        <Button
          block
          bordered
          warning
          onPress={() =>
            this.props.navigation.navigate("SignUpScreen")
          }
        >
          <Text style={{fontSize: 15, color: 'orangered', fontWeight: "bold"}}>CREATE ACCOUNT</Text>
        </Button>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    color: "black",
    marginLeft: 13,
    marginRight: 13,
    fontSize: 15,
  }
});

export default LoginScreen;
