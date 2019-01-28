import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Text, Alert } from 'native-base';

class LoginForm extends Component {
  render() {
    const { handleUserInput, login, credential } = this.props;
    return (
      <View style={styles.container}>
        <Form>
          <Item regular style={styles.item}>
            <Input
              style={styles.input}
              placeholder="EMAIL"
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                handleUserInput('email', text);
              }}
            />
          </Item>
          <Item regular style={styles.item}>
            <Input
              style={styles.input}
              placeholder="PASSWORD"
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={text => {
                handleUserInput('password', text);
              }}
            />
          </Item>
          <Button
            block
            danger
            onPress={() => {
              login(credential.email, credential.password);
            }}
          >
            <Text>LOGIN</Text>
          </Button>
          <Button
            transparent
            danger
            onPress={() => {
              if (!this.state.email) {
                Alert.alert('Please enter your email');
              } else {
                auth
                  .sendPasswordResetEmail(this.state.email)
                  .then(() => Alert.alert('Reset Password Email Sent!'));
              }
            }}
          >
            <Text style={{ fontSize: 13, alignSelf: 'center' }}>
              FORGOT PASSWORD?
            </Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 13 },
  item: { margin: 5 },
  input: { fontSize: 14 },
});
export default LoginForm;
