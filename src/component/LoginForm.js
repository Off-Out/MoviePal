import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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
        <Form>
          <Item block style={styles.item}>
            <Input
              placeholder="EMAIL"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => {
                handleUserInput('email', text);
              }}
            />
          </Item>
          <Item block style={styles.item}>
            <Input
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={text => {
                handleUserInput('password', text);
              }}
            />
          </Item>
          <Button
            style={styles.button}
            block
            danger
            onPress={() => {
              login(credential.email, credential.password);
            }}
          >
            <Text>LOGIN</Text>
          </Button>

          <Button
            block
            success
            style={styles.button}
            onPress={() => signInWithGoogle()}
          >
            <Text>SIGN-IN WITH GOOGLE</Text>
          </Button>

          <Button
            block
            primary
            style={styles.button}
            onPress={() => signInWithFacebook()}
          >
            <Text>SIGN-IN WITH FACEBOOK</Text>
          </Button>

          <View>
            <Button
              block
              danger
              style={styles.button}
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
              <Text>FORGOT PASSWORD?</Text>
            </Button>
            <Button
              block
              warning
              style={styles.button}
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
            >
              <Text>CREATE ACCOUNT</Text>
            </Button>
          </View>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  item: { marginLeft: 10, marginRight: 10, marginBottom: 10 },
  button: { marginLeft: 10, marginRight: 10, marginBottom: 10 },
});
export default LoginForm;
