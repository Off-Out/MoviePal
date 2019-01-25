import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'native-base';

class SignUpSection extends Component {
  render() {
    const { credential, createUserAccount, login } = this.props;
    return (
      <View style={styles.container}>
        <Button
          block
          style={styles.mb15}
          onPress={() => {
            login(credential.email, credential.password);
          }}
        >
          <Text style={styles.text}>LOGIN</Text>
        </Button>
        <Button
          block
          style={styles.mb17}
          onPress={() =>
            createUserAccount(credential.email, credential.password)
          }
        >
          <Text style={styles.text}>CREATE ACCOUNT</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mb15: {
    backgroundColor: '#e0393e',
    margin: 10,
  },
  text: {
    color: 'white',
  },
});

export default SignUpSection;
