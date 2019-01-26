import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';

class LoginForm extends Component {
  render() {
    const { handleUserInput, login, credential } = this.props;
    return (
      <View style={styles.container}>
        <Form>
          <Item regular style={styles.item}>
            <Input
              style={styles.input}
              placeholder="EMAIL-ADDRESS"
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
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 13 },
  item: { margin: 5 },
  input: { fontSize: 13, color: 'lightgrey' },
});
export default LoginForm;
