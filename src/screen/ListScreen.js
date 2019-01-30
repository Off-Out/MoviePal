import React, { Component } from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
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
              const distance = item.location.distance.toString().slice(0, 4);
              return (
                <Card style={{
                  backgroundColor: 'white',
                  width: 400,
                  height: 200,
                  alignItems: 'left',
                }}
                  key={i} >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 40,
                      backgroundColor: 'white',
                    }}
                  >
                    <Card.Content style={{ marginTop: 25 }}>

                      <Title >{item.name}</Title >
                      <Text > {distance} miles away</Text >
                      <Text>{`${item.location.address.street} ${
                        item.location.address.city
                        }, ${item.location.address.state}`} </Text>
                      {item.location.telephone ? (<Text > Phone Number: {item.location.telephone}</Text>) : <Text> Limited information </Text>}

                    </Card.Content>
                  </View>
                  <Card.Actions style={{ justifyContent: 'center' }}>
                    <Button
                      style={{ margin: 20, align: 'left' }}
                      mode="contained"
                      onPress={() =>
                        this.props.navigation.navigate('SingleTheater', {
                          theatre: item,
                        })
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
