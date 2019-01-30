import React, { Component } from 'react';
import { Text,ScrollView, View} from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import MapScreen from './MapScreen';




class ListScreen extends React.Component {
  render() {

    const { navigation } = this.props;

     const theaters = navigation.getParam('theaters');

    if (!theaters) {
      return <Text>...Loading</Text>;
    } else {
    return (
      <ScrollView>
        <Title> Theaters  </Title>
         {/* {theaters.map(item => (<Text key={item.theaterId}>{item.name}</Text> ))} */}

    {
    theaters.map((item, i) => {
      return (
       <Card   style={{
            backgroundColor: 'white',
            width: 400,
            height: 100,
            alignItems: 'center',
          }}
          elevation={4} key={i} >
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 40,
              backgroundColor: 'white',
            }}
          >
            <Card.Content style={{ marginTop: 25 }}>

          <Text >{item.name}</Text >
          <Text > {item.location.distance}</Text >
           <Text > {item.location.telephone}</Text>
           </Card.Content>
           </View>
           <Card.Actions style={{ justifyContent: 'center' }}>
            <Button
                onPress={() =>
                  Alert.alert(
                    'You will see the selected theater page soon'
                  )
                }
              >
               <Text> Go to Theater Page</Text>
              </Button>
              </Card.Actions>
        </Card>
      );
    })
  }

      </ScrollView>
    );
  }
}
}

export default ListScreen;
