import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.verifyAccount();
  }

  // Fetch the token from storage then navigate to our appropriate place
  verifyAccount = () => {
    const { navigation } = this.props;
    console.log(navigation);
    const userID = navigation.getParam('userID', null);
    console.log(userID);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log('I am at the AuthLoading Page');
    this.props.navigation.navigate(info ? 'App' : 'Auth');
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
