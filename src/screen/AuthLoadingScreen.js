import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { auth } from '../firebase'
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.verifyAccount();
  }

  // Fetch the token from storage then navigate to our appropriate place
  verifyAccount = () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log('I am at the AuthLoading Page');

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('authloading', user)
        this.props.navigation.navigate('App', {userId: user.uid})
      } else {
        this.props.navigation.navigate('Auth')
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
