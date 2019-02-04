import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  Keyboard,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { Item, Input, Button } from 'native-base';
import { RkStyleSheet } from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import { scaleVertical } from '../utility/duc';
import firebase, { auth, database } from '../firebase';

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(25),
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
  },
  input: {
    marginVertical: 5,
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    borderColor: theme.colors.border.solid,
  },
  footer: {},
}));

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
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
        this.props.navigation.navigate('AuthLoading', {
          userId: result.user.uid,
        });
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
      .then(async () => {
        const user = auth.currentUser || {};
        if (user.uid) {
          database.ref(`users/${user.uid}`).once('value', snapshot => {
            if (snapshot.exists()) {
              console.log('exists!');
            }
            if (!snapshot.exists()) {
              console.log('doesnt exist!');

              database.ref(`users/${user.uid}`).set({
                name: user.providerData[0].displayName,
                email: user.providerData[0].email,
                photo: user.providerData[0].photoURL,
              });
            }
          });
        }
      })
      .finally(() => {
        const user = auth.currentUser || {};
        this.props.navigation.navigate('App', { userId: user.uid });
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
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
        <View style={styles.header}>
          <Image style={styles.image} source={require('../image/logo.png')} />
          <Text>Movie Pal</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Item rounded style={styles.input}>
              <Input
                placeholder="EMAIL"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => {
                  this.handleUserInput('email', text);
                }}
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input
                placeholder="PASSWORD"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={text => {
                  this.handleUserInput('password', text);
                }}
              />
            </Item>
            <Button
              rounded
              block
              light
              style={styles.input}
              onPress={() => {
                this.login(this.state.email, this.state.password);
              }}
            >
              <Text>LOGIN</Text>
            </Button>
          </View>
          <View style={styles.buttons}>
            {
              <Ionicons
                name="logo-google"
                size={50}
                onPress={() => this.signInWithGoogle()}
              />
            }
            {
              <Ionicons
                name="logo-facebook"
                size={50}
                onPress={() => this.signInWithFacebook()}
              />
            }
          </View>

          <View style={styles.textRow}>
            <Text>Don’t have an account? </Text>

            <Text
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
              style={{ color: 'red' }}
            >
              Sign up now
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
