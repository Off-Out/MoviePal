import React from 'react';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';
import { Linking, Alert } from 'react-native';
import axios from 'axios';

const YELP_API_KEY = 'QSmArIKWLEtUC3PsRCUX65qaG7LwKRuwI5xdspxireqe--_jo80bx3n6sDgcFG0yK2Zzye9XJ0rtBrEF6-vk3qO6liCG2XpkAiXp5uYseqwsEzKboIEgEzpfw9RIXHYx'

export default class MapScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      markers: [],
      origin: { latitude: 41.8781, longitude: -87.6298 },
    };
    config = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: 'movie',
//term to search locations by
        raduis: 1,
        latitude: this.state.origin.latitude,
        longitude: this.state.origin.longitude,
				categories: 'Cinema',
// for lat/long we are searching locations by proximity of users location which is the location from geolocation api
        sort_by: 'distance',
//can sort by best_match, rating, review_count or distance

        limit: 10,
//the amount of location markers you want to show
      },
    };
  }
getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let newOrigin = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          config.params.latitude = newOrigin.latitude;
          config.params.longitude = newOrigin.longitude;
this.setState({
            origin: newOrigin,
          });
          resolve(true);
        },
        err => {
          console.log('error');
          console.log(err);
          reject(reject);
        },
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
      );
    });
  };
async componentDidMount() {
    await this.getLocation();
    await this.fetchMarkerData();
  }
fetchMarkerData() {
    return axios
      .get('https://api.yelp.com/v3/businesses/search', config)
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson.data.businesses.map(x => x),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={ PROVIDER_GOOGLE }
        region={{
          latitude: this.state.origin.latitude,
          longitude: this.state.origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {this.state.isLoading
          ? null
          : this.state.markers.map(marker => {
              const coords = {
                latitude: marker.coordinates.latitude,
                longitude: marker.coordinates.longitude,
              };
const nameOfMarker = `${marker.name}(${marker.rating} rating)`;
const addressOfMarker = `${marker.location.address1}, ${marker.location.city}`;
              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={coords}
                  title={nameOfMarker}
                  description={addressOfMarker}
                >
               </MapView.Marker>
              );
            })}
          <MapView.Marker coordinate={this.state.origin}>
        </MapView.Marker>
      </MapView>
    );
  }
}



// import React, { Component } from 'react';
// import {StyleSheet, View, Text } from 'react-native';
// import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';

//     const dummyPlace =[{name:'My Thai', category: 'Restaurants' , latitude:41.8758 , longitude: -87.6189 },
// {name:'My Yoga', category: 'Activities' , latitude:41.8836 , longitude:-87.6163 },
// {name:'Aquarium', category: 'Sport' , latitude:41.8776 , longitude:-87.6140 },
// {name:'Market', category: 'Art' , latitude:41.8923 , longitude:-87.6167 }]

// export default class MapScreen extends Component {

//   render() {


//     return (
//       <View style={styles.container}>
//      <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         region={{
//           latitude: 41.8781,
//           longitude: -87.6298,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421

//         }}
//       >

//       {/* <MapView.Marker coordinate={{
//           latitude: 41.8781,
//           longitude: -87.6298,}}
//           title={'Are you there'}
//           description={'Yes I am!!'}/> */}
//       {dummyPlace.map( place =>(
//         <MapView.Marker key={place.name} coordinate={{
//           latitude: place.latitude,
//           longitude: place.longitude
//         }}
//          title={place.category}
//           description={place.name}

//         />
//       ))}
//       </MapView>
//       </View>
//     );
//   }
// }

// const styles= StyleSheet.create({
//   container:{
//     position: 'absolute',
//     top:0,
//     left:0,
//     bottom:0,
//     right:0,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   map:{
//     position: 'absolute',
//     top:0,
//     left:0,
//     bottom:0,
//     right:0,
//   }
// })
