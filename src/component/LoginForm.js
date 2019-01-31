import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';
import { auth } from '../firebase';

class LoginForm extends Component {
  render() {
    const {
      handleUserInput,
      login,
      credential,
      signInWithGoogle,
      signInWithFacebook,
    } = this.props;

    return (
      <View style={styles.container}>
        <Form style={{ margin: 5 }}>
          <Item block>
            <Input
              placeholder="EMAIL"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => {
                handleUserInput('email', text);
              }}
            />
          </Item>
          <Item block>
            <Input
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={text => {
                handleUserInput('password', text);
              }}
            />
            <Button
              dark
              small
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => {
                if (!credential.email) {
                  console.log('here');
                  Alert.alert('Please enter your email');
                } else {
                  auth
                    .sendPasswordResetEmail(credential.email)
                    .then(() => Alert.alert('Reset Password Email Sent!'));
                }
              }}
            >
              <Text style={{ fontSize: 12.5, fontWeight: 'bold' }}>
                Forgot Password?
              </Text>
            </Button>
          </Item>
        </Form>
        <Button
          style={styles.button}
          block
          success
          onPress={() => {
            login(credential.email, credential.password);
          }}
        >
          <Text>Login</Text>
        </Button>

        <Button
          block
          danger
          style={styles.button}
          onPress={() => signInWithGoogle()}
        >
          <Text>Google Login</Text>
        </Button>

        <Button
          block
          primary
          style={styles.button}
          onPress={() => signInWithFacebook()}
        >
          <Text>Facebook Login</Text>
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (!credential.email) {
                console.log('here');
                Alert.alert('Please enter your email');
              } else {
                auth
                  .sendPasswordResetEmail(credential.email)
                  .then(() => Alert.alert('Reset Password Email Sent!'));
              }
            }}
          >
            <Text style={{ color: '#A9A9A9' }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          >
            <Text style={{ color: '#A9A9A9' }}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: { margin: 5 },
});
export default LoginForm;
