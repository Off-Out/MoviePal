import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { LoginForm } from '../component';
import firebase, { auth, database } from '../firebase';
import axios from 'axios';
import Stor from '../store/Stor';

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
      .then(result => {
        this.props.navigation.navigate('App', { userId: result.user.uid });
      })
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
          return auth.signInAndRetrieveDataWithCredential(credential);
        } else {
          return { cancelled: true };
        }
      })
      .then(() => {
        const user = auth.currentUser || {};
        if (user.uid) {
          database.ref(`users/${user.uid}`).once('value', snapshot => {
            if (snapshot.exists()) {
              console.log('exists!');
              this.props.navigation.navigate('App', { userId: user.uid });
            }
            if (!snapshot.exists()) {
              console.log('doesnt exist!');

              database.ref(`users/${user.uid}`).set({
                name: user.providerData[0].displayName,
                email: user.providerData[0].email,
                photo: user.providerData[0].photoURL,
              });
              this.props.navigation.navigate('App', { userId: user.uid });
            }
          });
        }
      })
      .catch(error => console.error(error));
  };

  signInWithFacebook = async () => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '367646357383853',
        { permissions: ['public_profile', 'email'] }
      );
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      auth.signInAndRetrieveDataWithCredential(credential).catch(error => {
        console.log('Add Error for login', error);
      });

      // if (type === 'success') {
      //   const { data } = await axios(
      //     `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      //   );
      //   const user = auth.currentUser;
      //   if (user.uid) {
      //     database.ref(`users/${user.uid}`).once('value', snapshot => {
      //       if (snapshot.exists()) {
      //         console.log('exists!');
      //         this.props.navigation.navigate('App', { userId: user.uid });
      //       }
      //       if (!snapshot.exists()) {
      //         console.log('doesnt exist!');
      //         console.log('loginscreen user', user);

      //         database.ref(`users/${user.uid}`).set({
      //           name: data.name,
      //           email: data.email,
      //         });
      //         this.props.navigation.navigate('App', { userId: user.uid });
      //       }
      //     });
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Image source={require('../image/manny.png')} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 10,
          }}
        >
          <LoginForm
            handleUserInput={this.handleUserInput}
            login={this.login}
            credential={this.state}
            signInWithGoogle={this.signInWithGoogle}
            signInWithFacebook={this.signInWithFacebook}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
