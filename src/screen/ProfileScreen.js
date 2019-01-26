import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, AsyncStorage } from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import {auth, database} from '../firebase';

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: 'EventPal',
      email: 'eventPal@gmail.com',
      location: '60605',
    };
  }

  async componentDidMount() {
    const { getParam } = this.props.navigation;
    let user = '';
    await database.ref(`/users/${getParam('userId')}`).on('value', (snapshot) => {
      user = snapshot.val()
    });
    this.setState({
      email: user.email
    })
  }

  handleName = text => this.setState({ name: text });
  handleEmail = text => this.setState({ email: text });
  handleLocation = text => this.setState({ location: text });

  render() {
    return (
      <Form style={styles.form}>
        <Image
          source={require('../image/user-account-icon-13.jpg')}
          style={styles.image}
        />
        <Item stackedLabel style={styles.item}>
          <Label style={styles.label}>NAME</Label>
          <Input
            style={styles.input}
            name="name"
            value={this.state.name}
            onChangeText={this.handleName}
          />
        </Item>
        <Item stackedLabel style={styles.item}>
        <Label style={styles.label}>NAME</Label>
          <Input
            style={styles.input}
            keyboardType="email-address"
            name="email"
            value={this.state.email}
            onChangeText={this.handleEmail}
          />
        </Item>
        <Item stackedLabel style={styles.item}>
          <Label style={styles.label}>LOCATION</Label>
          <Input
            style={styles.input}
            keyboardType={'numeric'}
            style={styles.input}
            name="location"
            value={this.state.location}
          />
        </Item>
        <Button transparent danger style={styles.button}>
          <Text>SAVE</Text>
        </Button>
        <Button
          transparent
          danger
          style={styles.button}
          onPress={() =>
            auth
              .signOut()
              .finally(() => { 
                console.log('Sign Out!');
                this.props.navigation.navigate('Auth');
              }).catch(error => Alert.alert(error.message))
          }
        >
          <Text>LOG OUT</Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    borderColor: 'transparent',
  },
  label: {
    marginLeft: 13,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 55,
  },

  input: {
    marginLeft: 13,
    fontSize: 17,
    marginRight: 25,
    paddingTop: 13,
    marginBottom: 10,
    borderColor: 'indianred',
    borderBottomWidth: 0.5,
  },

  button: {
    margin: 13,
  },
});
