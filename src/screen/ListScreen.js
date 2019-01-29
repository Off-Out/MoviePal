import React, { Component } from 'react';
import { Text,ScrollView, View} from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import MapScreen from './MapScreen';




class ListScreen extends React.Component {
  render() {

    const { navigation } = this.props;

     const theaters = navigation.getParam('theaters');


    return (
      <ScrollView>
        <Title> Theaters  </Title>
         {theaters.map(item => (<Text key={item.theaterId}>{item.name}</Text> ))}

  {/* {
    theaters.map((item, i) => {
      return (
       <Card key={i} >

          <Card.Content >{item.name}</Card.Content >
          <Card.Content > {item.location.distance}</Card.Content >
           <Card.Content > {item.location.telephone}</Card.Content >
        </Card>
      );
    })
  } */}





        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </ScrollView>
    );
  }
}

export default ListScreen;
