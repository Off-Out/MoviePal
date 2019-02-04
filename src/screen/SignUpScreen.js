import React, { Component } from 'react';
import {
  View,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Item, Input, Button, Text } from 'native-base';
import { RkStyleSheet } from 'react-native-ui-kitten';
import { scaleVertical } from '../utility/duc';
import { auth, database } from '../firebase';

const styles = RkStyleSheet.create(() => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  content: {
    justifyContent: 'space-between',
  },
  item: {
    marginVertical: 15,
  },
  footer: {
    justifyContent: 'flex-end',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

class SignUpScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleNewUserInput = (stateField, text) => {
    this.setState({
      [stateField]: text,
    });
  };

  createUserAccount = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        database.ref(`users/${user.user.uid}`).set({
          name: this.state.name,
          email: this.state.email,
        });
        this.props.navigation.navigate('App', { userId: user.uid });
      })
      .catch(error => Alert.alert(error.message));
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
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.image} source={require('../image/logo.png')} />
          <Text>Registration</Text>
        </View>

        <View style={styles.content}>
          <Item rounded style={styles.item}>
            <Input
              placeholder="NAME"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => {
                this.handleNewUserInput('name', text);
              }}
            />
          </Item>
          <Item rounded style={styles.item}>
            <Input
              placeholder="EMAIL"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => {
                this.handleNewUserInput('email', text);
              }}
            />
          </Item>

          <Item rounded style={styles.item}>
            <Input
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={text => {
                this.handleNewUserInput('password', text);
              }}
            />
          </Item>
          <Button
            style={styles.item}
            rounded
            block
            light
            onPress={() =>
              this.createUserAccount(this.state.email, this.state.password)
            }
          >
            <Text>Join MoviePal</Text>
          </Button>
        </View>
        <View style={styles.textRow}>
          <Text>Already have an account? </Text>

          <Text
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            style={{ color: 'red' }}
          >
            Sign in now
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUpScreen;
