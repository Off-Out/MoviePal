import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Alert } from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { auth, database } from '../firebase';

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      location: '',
      password: '',
    };
  }

  componentDidMount() {
    const userId = this.props.screenProps
    console.log("userId", userId)
    console.log(this.props.screenProps,">>>>screenProps")
    database.ref(`/users/${userId}`).on('value', snapshot => {
      let user = snapshot.val()
      console.log("profilescreen" , user)
      console.log("profilescreen snapshot.val()" , snapshot.val())
      this.setState({
        name: user.name,
        email: user.email,
        location: user.location,
      });
    });
  }

  handleInput = (stateField, text) => {
    this.setState({ [stateField]: text });
  };

  logout = () => {
    auth
      .signOut()
      .finally(() => {
        console.log('Sign Out!');
        this.props.navigation.navigate('Auth');
      })
      .catch(error => Alert.alert(error.message));
  };

  save = async userId => {
    let userRef = await database.ref('users').child(`${userId}`);
    userRef
      .update({
        name: this.state.name,
        email: this.state.email,
        location: this.state.location,
      })
      .then(() => {
        if (this.state.email) auth.currentUser.updateEmail(this.state.email);
        if (this.state.password)
          auth.currentUser.updatePassword(this.state.password);
      })
      .then(() => {
        this.setState({ password: '' });
        Alert.alert('Saved!');
      })
      .catch(error => Alert.alert(error.message));
  };

  render() {
    const currentUser = auth.currentUser;
    const isProvider = currentUser.providerData[0].providerId !== 'password';
    const display = isProvider ? 'none' : 'flex';

    const userId = this.props.screenProps;

    const movieTitle = 'Little Mermaid';
    const chatId = "a1234567bc";

<<<<<<< HEAD
    const randomChatRoomId = (userId) => {
      const chatRef = database.ref('chatroom/' + chatId)
=======
    const goToChatRoom = (userId) => {
      const chatRef = database.ref('chatroom/' + chatId)
      const userRef = database.ref('users/' + userId)
>>>>>>> 76dec75881f71287319753a62109629be3df6a1e
      chatRef.update({
        title: movieTitle,
        users: userId,
      })
      .then(() => chatRef.child(`/users/${userId}`).set(true))
<<<<<<< HEAD
=======
      // .then(() => userRef.update({
      //   movie: movieTitle,
      //   chatId: chatId
      // }))
>>>>>>> 76dec75881f71287319753a62109629be3df6a1e
      .then(() => {
        console.log('here???')
        this.props.navigation.navigate('Chat', {info: {
          movie: movieTitle,
          chatId: chatId,
          user: userId
        }})
      })
    }

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
        <Input
          style={[styles.input, { display }]}
          secureTextEntry={true}
          name="password"
          value={this.state.password}
          onChangeText={text => this.handleInput('password', text)}
        />
        <Button
          transparent
          danger
          style={[styles.saveBtn, { display }]}
          onPress={() => {
            this.save(userId);
          }}
        >
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
        <Button
          primary
          style={styles.button}
          onPress={() => {
            console.log('Pressed Add Event Button');
<<<<<<< HEAD
            randomChatRoomId(userId);
=======
            goToChatRoom(userId);
>>>>>>> 76dec75881f71287319753a62109629be3df6a1e
          }}
        >
          <Text>Add Event</Text>
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

  saveBtn: {
    margin: 7,
  },
});
