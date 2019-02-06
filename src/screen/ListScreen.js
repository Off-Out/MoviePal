import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Linking
} from 'react-native';
import { Text } from 'native-base';
import { material, iOSColors } from 'react-native-typography';
import { Card, Divider } from 'react-native-paper';

import { connect } from 'react-redux';

const textStyles = StyleSheet.create({
  theaterTitle: {
    color: iOSColors.black,
    ...material.robotoWeights,
    ...material.title3Emphasized,
    maxWidth: Dimensions.get('window').width * 100,
    letterSpacing: 0.5
  },
  text: {
    color: iOSColors.purple,
    ...material.robotoWeights,
    ...material.body1,
    maxWidth: Dimensions.get('window').width * 100,
    letterSpacing: 0.5
  }
});

class ListScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Theater List'
  };

  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  render() {
    const theaters = this.props.theaters;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {theaters.map((item) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() =>
                    this.props.navigation.navigate('SingleTheater', {
                      theatre: item
                    })
                  }
                >
                  <Card
                    style={{
                      alignContent: 'center',
                      alignSelf: 'center',
                      width: this.vw(90),
                      height: this.vh(15),
                      borderWidth: 2,
                      borderColor: '#aa1919',
                      borderTop: true,
                      borderBottom: true,
                      elevation: 4,
                      margin: 10
                    }}
                  >
                    <Card.Content flexDirection="row">
                      <View
                        style={{
                          marginRight: 5,
                          justifyContent: 'space-evenly'
                        }}
                      >
                        <Text style={textStyles.theaterTitle}>{item.name}</Text>
                        <Divider />

                        <Text style={textStyles.text}>
                          {item.location.address.street}{' '}
                          {item.location.address.city},{' '}
                          {item.location.address.state}
                        </Text>
                        {item.location.telephone ? (
                          <Text
                            style={textStyles.text}
                            onPress={() => {
                              Linking.openURL(`tel://+123456789`);
                            }}
                          >
                            {item.location.telephone}
                          </Text>
                        ) : (
                          <Text style={textStyles.text}>
                            Limited information{' '}
                          </Text>
                        )}
                      </View>
                    </Card.Content>
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

const mapStateToProps = (state) => {
  return {
    theaters: state.theaters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
