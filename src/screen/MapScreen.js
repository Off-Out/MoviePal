import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
// import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';

    const dummyPlace =[{name:'My Thai', category: 'Restaurants' , latitude:41.8758 , longitude: -87.6189 },
{name:'My Yoga', category: 'Activities' , latitude:41.8836 , longitude:-87.6163 },
{name:'Aquarium', category: 'Sport' , latitude:41.8776 , longitude:-87.6140 },
{name:'Market', category: 'Art' , latitude:41.8923 , longitude:-87.6167 }]

export default class MapScreen extends Component {

  render() {


    return (
      <View style={styles.container}>
     {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 41.8781,
          longitude: -87.6298,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421

        }}
      > */}

      {/* <MapView.Marker coordinate={{
          latitude: 41.8781,
          longitude: -87.6298,}}
          title={'Are you there'}
      //     description={'Yes I am!!'}/> */}
      {/* // {dummyPlace.map( place =>( */}
      {/* //   <MapView.Marker key={place.name} coordinate={{ */}
      {/* //     latitude: place.latitude,
      //     longitude: place.longitude
      //   }}
      //    title={place.category}
      //     description={place.name}

      //   />
      // ))}
      // </MapView> */}
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container:{
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map:{
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
  }
})
