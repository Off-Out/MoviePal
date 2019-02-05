import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Alert } from 'react-native';
import { Form, Item, Label, Input, Button, Text, Icon } from 'native-base';
import { Avatar } from 'react-native-elements';
import { Constants, ImagePicker, Permissions } from 'expo';
import firebase, { auth, database } from '../firebase';
import { storage } from 'firebase';
// import UploadPicBackEnd from '../component/UploadPicBackEnd';

export default class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      location: '',
      password: '',
      photo: '',
      uploading: '',
      hidePassword: true,
      show: 'SHOW',
    };
  }

  async componentDidMount() {
    const userId = this.props.screenProps;
    console.log("profilescreen props", this.props)
    await database.ref(`/users/${userId}`).on('value', snapshot => {
      let user = snapshot.val();
      this.setState({
        name: user.name,
        email: user.email,
        location: user.location,
      });
    });
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
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

  showPassword = () => {
    if (!!this.state.hidePassword) {
      this.setState({ hidePassword: false });
      this.setState({ show: 'HIDE' });
    } else {
      this.setState({ hidePassword: true });
      this.setState({ show: 'SHOW' });
    }
  };

  _pickImage = async () => {
    console.log('Click _pickImage!!')
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ photo: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    }
  };

async uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

  render() {
    const userId = this.props.screenProps;
    const {navigation} = this.props;
    let isProvider = false;
    let currentUser = auth.currentUser || {};
    if (currentUser.providerData) {
      isProvider = currentUser.providerData[0].providerId !== 'password';
    }
    let display = isProvider ? 'none' : 'flex';

    return (
      <Form style={styles.form}>
        {/* <Image
          source={require('../image/user-account-icon-13.jpg')}
          style={styles.image}
        /> */}
        <Avatar
          size="xlarge"
          rounded
          source={{ uri: '../image/user-account-icon-13.jpg'}}
          showEditButton
          onEditPress={() => this._pickImage()}
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
        <Item stackedLabel style={[styles.item, { display }]}>
          <Label style={styles.label}>LOCATION</Label>
          <Input
            style={styles.input}
            keyboardType={'numeric'}
            name="location"
            value={this.state.location}
            onChangeText={text => this.handleInput('location', text)}
          />
        </Item>
        <Item stackedLabel style={[styles.item, { display }]}>
          <View style={styles.changepw}>
            <Label style={styles.label}>CHANGE PASSWORD</Label>
            <Button
              danger
              transparent
              small
              style={styles.showBtn}
              onPress={this.showPassword}
            >
              <Text>{this.state.show}</Text>
            </Button>
          </View>
          <Input
            style={styles.input}
            secureTextEntry={this.state.hidePassword}
            name="password"
            value={this.state.password}
            onChangeText={text => this.handleInput('password', text)}
          />
        </Item>
        <Button
          danger
          style={[{ margin: 20 }, { display }]}
          onPress={() => {
            this.save(userId);
          }}
        >
          <Text>SAVE</Text>
        </Button>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            transparent
            danger
            style={{ marginLeft: 10 }}
            onPress={() => this.logout()}
          >
            <Text>LOG OUT</Text>
          </Button>
          <Button
            style={{ marginRight: 15 }}
            dark
            transparent
            onPress={() => {
              console.log("MY MOVIE HISTORY")
              navigation.navigate('History')
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>🍿MY MOVIES</Text>
          </Button>
        </View>
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
  labelPassword: {
    fontSize: 13,
    marginLeft: 7,
    marginBottom: -5,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
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
  inputPassword: {
    marginLeft: 7,
    fontSize: 13,
    paddingTop: 1,
    marginRight: 20,
    marginTop: -15,
    borderColor: 'indianred',
    borderBottomWidth: 0.5,
  },
  changepw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  showBtn: {
    alignSelf: 'center',
    padding: -30,
    marginBottom: -20,
    marginRight: 10,
    fontSize: 5,
  },
});
