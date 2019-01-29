import React, { Component } from 'react';
import { Text,SafeAreaView, View ,Button} from 'react-native';
import MapScreen from './MapScreen';


class ListScreen extends React.Component {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;

     const theaters = navigation.getParam('theaters');


    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>List Screen</Text>
        <Text> Theaters: {JSON.stringify(theaters)}</Text>



        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </SafeAreaView>
    );
  }
}

export default ListScreen;
