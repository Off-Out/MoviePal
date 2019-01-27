import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { MapView } from 'expo';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps'
import get from 'lodash/get';

// const deltas = {
// 	latitudeDelta: 0.0922,
// 	longitudeDelta: 0.0421
// };

// const initialRegion = {
// 	latitude: 41.8781,
// 	longitude:-87.6298,
// };

// const Marker = MapView.Marker;


export default class Map extends Component {

  render() {


    return (
      <View style={styles.container}>
       <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 41.8781,
          longitude: -87.6298,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421

        }}
      >
      {dummyPlace.map( place =>(
        <MapView.Marker key={place.name} coordinate={{
          latitude: place.latitude,
          longitude: place.longitude
        }}
         title={place.category}
          description={place.name}

        />
      ))}
      </MapView>
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


// class Map extends Component {
// 	renderMarkers() {
// 		return this.props.places.map((place, i) => (
// 			<Marker key={i} title={place.name} coordinate={place.coords} />
// 		));
// 	}

// 	render() {
// 		const { location } = this.props;
// 		const region = {
// 			latitude: get(location, 'coords.latitude', null),
// 			longitude: get(location, 'coords.longitude', null),
// 			...deltas
// 		};

// 		if (!region.latitude || !region.longitude) {
// 			return (
// 				<View>
// 					<Text>Loading map...</Text>
// 				</View>
// 			);
// 		}

// 		return (
// 			<MapView
// 				style={styles.container}
//         provider={PROVIDER_GOOGLE}
// 				region={region}
// 				initialRegion={{ ...initialRegion, ...deltas }}
// 				showsUserLocation
// 				showsMyLocationButton
// 			>
// 				{this.renderMarkers()}
// 			</MapView>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		width: '100%',
// 		height: '80%'
// 	}
// });

// export default Map;
