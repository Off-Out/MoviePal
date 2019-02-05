import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Text, H2 } from 'native-base';
import { connect } from 'react-redux';

class ListScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Theater List',
  };
  render() {
    const theaters = this.props.theaters;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {theaters.map(item => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() =>
                    this.props.navigation.navigate('SingleTheater', {
                      theatre: item,
                    })
                  }
                >
                  <Card>
                    <CardItem>
                      <Body>
                        <H2>{item.name}</H2>

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

const mapStateToProps = state => {
  return {
    theaters: state.theaters,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
