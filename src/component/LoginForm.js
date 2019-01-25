import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input } from 'native-base';

class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form>
          <Item regular style={styles.input}>
            <Input
              placeholder="please@please.com"
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                this.props.handleUserInput('email', text);
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
                this.props.handleUserInput('password', text);
              }}
            />
          </Item>
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
