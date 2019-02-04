import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Text, H2 } from 'native-base';

class ListScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Theater List'
  };
  render() {
    const { navigation } = this.props;
    const theaters = navigation.getParam('theaters');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {theaters.map((item) => {
              const distance = item.location.distance.toString().slice(0, 4);
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() =>
                    this.props.navigation.navigate('SingleTheater', {
                      theatre: item
                    })
                  }
                >
                  <Card>
                    <CardItem>
                      <Body>
                        <H2>{item.name}</H2>
                        <Text>{distance} miles away</Text>
                        <Text>
                          {`${item.location.address.street} ${
                            item.location.address.city
                          }, ${item.location.address.state}`}{' '}
                        </Text>
                        {item.location.telephone ? (
                          <Text>Phone Number: {item.location.telephone}</Text>
                        ) : (
                          <Text>Limited information </Text>
                        )}
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default ListScreen;
