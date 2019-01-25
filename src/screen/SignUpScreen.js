import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import {auth, database} from '../firebase'

class SignUpScreen extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      location: '',
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
          location: this.state.location,
          email: this.state.email
        })
        this.props.navigation.navigate('App', {userId: user.user.uid})
      })
      .catch(error => Alert.alert(error.message));
  };

  render() {
    const {name, email, location, password} = this.state
    return (
      <View style={styles.container}>
        <Form>
          <Item floatingLabel >
          <Label style={styles.label}>NAME</Label>
            <Input
            style={styles.input}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                this.handleNewUserInput('name', text);
              }}
            />
          </Item>
          <Item floatingLabel >
          <Label style={styles.label}>ZIPCODE</Label>
            <Input
            style={styles.input}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                this.handleNewUserInput('location', text);
              }}
            />
          </Item>
          <Item floatingLabel >
          <Label style={styles.label}>E-MAIL ADDRESS</Label>
            <Input
            style={styles.input}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                this.handleNewUserInput('email', text);
              }}
            />
          </Item>
          <Item floatingLabel >
          <Label style={styles.label}>CREATE PASSWORD</Label>
            <Input
            style={styles.input}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={text => {
                this.handleNewUserInput('password', text);
              }}
            />
          </Item>
          <Button
          block
          transparent
          primary
          style={styles.mb17}
          onPress={() =>
            this.createUserAccount(this.state.email, this.state.password)
          }
        >
          <Text style={styles.text}>CREATE ACCOUNT</Text>
        </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 10, top: 30 },
  input: {
    fontSize: 17,
    marginRight: 25,
    paddingTop: 13,
    marginBottom: 10,
    // borderColor: 'indianred',
    // borderBottomWidth: 0.5,
  },
  label: {
    // marginLeft: 13,
    fontSize: 12,
    marginRight: 10,
  },
});

export default SignUpScreen;
