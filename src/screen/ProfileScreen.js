import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Alert } from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import {auth, database} from '../firebase';
import PasswordInputText from 'react-native-hide-show-password-input'

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      location: '',
      password: ''
    };
  }

  async componentDidMount() {
    const userId = this.props.screenProps;
    console.log(this.props.screenProps, "screenProps")
    let user = '';
    await database.ref(`/users/${userId}`).on('value', (snapshot) => {
      user = snapshot.val();
      this.setState({
        name: user.name,
        email: user.email,
        location: user.location,
      })
    })
  }

  handleInput = (stateField, text) => {
    this.setState({ [stateField]: text })
  }

  logout = () => {
    auth
    .signOut()
    .finally(() => { 
      console.log('Sign Out!');
      this.props.navigation.navigate('Auth');
    }).catch(error => Alert.alert(error.message))
  }

  save = async (userId) => {
    let userRef = await database.ref('users').child(`${userId}`);
      userRef.update({
        "name": this.state.name,
        "email": this.state.email,
        "location": this.state.location
      }).then(() => {
        if (this.state.email) auth.currentUser.updateEmail(this.state.email)
        if (this.state.password) auth.currentUser.updatePassword(this.state.password);
      }).then(() => {
        this.setState({password: ''});
        Alert.alert('Saved!')
      })
      .catch(error => Alert.alert(error.message))
  }

  render() {
    const userId = this.props.screenProps;
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
            onChangeText={text => this.handleInput('name', text)}
          />
        </Item>
        <Item stackedLabel style={styles.item}>
        <Label style={styles.label}>EMAIL</Label>
          <Input
            style={styles.input}
            keyboardType="email-address"
            name="email"
            value={this.state.email}
            onChangeText={text => this.handleInput('email', text)}
          />
        </Item>
        <Item stackedLabel style={styles.item}>
          <Label style={styles.label}>LOCATION</Label>
          <Input
            style={styles.input}
            keyboardType={'numeric'}
            name="location"
            value={this.state.location}
            onChangeText={text => this.handleInput('location', text)}
          />
        </Item>
        <PasswordInputText
            style={styles.password}
            // secureTextEntry={true}
            name="password"
            value={this.state.password}
            onChangeText={text => this.handleInput('password', text)}
          />
        <Button transparent danger style={styles.button} onPress={()=> {
          console.log('save')
          this.save(userId)
        }}>
          <Text>SAVE</Text>
        </Button>
        <Button
          transparent
          danger
          style={styles.button}
          onPress={() => this.logout()}
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
    fontSize: 13,
    marginLeft: 7,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 55,
  },

  input: {
    marginLeft: 7,
    fontSize: 17,
    marginRight: 20,
    paddingTop: 1,
    marginBottom: 10,
    borderColor: 'indianred',
    borderBottomWidth: 0.5,
  },

  button: {
    margin: 7,
  },
});
