import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Polyline} from 'react-native-maps';

import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

const Map = () => {

  let points = [];
  for(let i = 0; i < 20 ; i++) {
    if(i % 2 === 0) {
      points.push({
        latitude: 37.332333 + (i * 0.001),
        longitude: -122.03121 + (i * 0.001),
      })
    } else {
      points.push({
        latitude: 37.332333 + (-i * 0.002),
        longitude: -122.03121 + (-i * 0.001),
      })
    }
  }

  console.log(points)


   // very similar Image that has height and width
  return (
    <MapView 
      style={ styles.map }
      initialRegion={{
        latitude: 37.332333,
        longitude: -122.03121,
        // Zoom Level
        // when the number is smaller, the map gets larger area
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      {/* Tracking line */}
      <Polyline coordinates={ points }/>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  }
})

const MapViewContent = styled.View`

  height: 100%;
  

`;

export default Map;