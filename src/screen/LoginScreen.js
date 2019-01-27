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

  signInWithGoogle = async () => {
    try {
      await Expo.Google.logInAsync({
        androidClientId: "963629551224-0iocmkcve8i96rbg244m91mj5tvmflto.apps.googleusercontent.com",
        iosClientId: "963629551224-iivt1efj479sg2ucve5bjsdrm8ng3b75.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      .then(result => {
        const {user} = result;
        console.log(result, "<<<result")
        // return result.accessToken
        // database.ref(`users/${uid}`).set({
        //   name: user.name,
        //   email: user.email,
        //   image: user.photoUrl,
        // })
        // .then(() => this.props.navigation.navigate('App'
        // // , {userId: user.uid}
        // )
        // )
      })
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../image/epLogo.png')} />
        <LoginForm handleUserInput={this.handleUserInput} login={this.login} credential={this.state}/>
        <View style={styles.button}>
        <Button
          danger
          onPress={() => this.signInWithGoogle()}
        >
          <Text>Signin With Google</Text>
        </Button>
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
          <Text style={{fontSize: 10}}>FORGOT PASSWORD?</Text>
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
    maxHeight: 30,
    maxWidth: 30
  },
  button: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    fontSize: 15,
  }
});

export default LoginScreen;
