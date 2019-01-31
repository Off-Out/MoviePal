import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import * as Expo from 'expo';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { auth, database } from '../firebase';

class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      location: '',
      email: '',
      password: '',
      photoUrl: '',
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
          email: this.state.email,
        });
        this.props.navigation.navigate('App', { userId: user.uid });
      })
      .catch(error => Alert.alert(error.message));
  };

  render() {
    const { name, email, location, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}> WELCOME PAL! </Text>
        <Form style={styles.form}>
          <Item floatingLabel style={styles.item}>
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
          <Item floatingLabel style={styles.item}>
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
          <Item floatingLabel style={styles.item}>
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
          <Item floatingLabel style={styles.item}>
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
            outline
            success
            style={styles.createBtn}
            onPress={() =>
              this.createUserAccount(this.state.email, this.state.password)
            }
          >
            <Text>Join MoviePal</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
  },
  item: {
    borderColor: 'transparent',
  },
  form: {
    alignSelf: 'stretch',
    margin: 25,
  },
  input: {
    fontSize: 17,
    marginRight: 25,
    marginBottom: 10,
    borderColor: 'indianred',
    borderBottomWidth: 0.5,
  },
  label: {
    fontSize: 12,
    marginRight: 10,
  },
  createBtn: {
    fontSize: 15,
    marginTop: 40,
    alignSelf: 'center',
  },
  header: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 30,
  },
});

export default SignUpScreen;
