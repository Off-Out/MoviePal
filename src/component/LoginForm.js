import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';

class LoginForm extends Component {
  render() {
    const {handleUserInput, login, credential} = this.props
    return (
      <View style={styles.container}>
        <Form>
          <Item regular style={styles.input}>
            <Input
              placeholder="please@please.com"
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                handleUserInput('email', text);
              }}
            />
          </Item>
          <Item regular style={styles.input}>
            <Input
              placeholder="please123"
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
          style={styles.mb15}
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
  container: { flex: 1, margin: 10, top: 30 },
  input: { margin: 5 },
});
export default LoginForm;
