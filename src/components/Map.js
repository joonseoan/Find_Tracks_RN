import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
// Polyline: tracking the path
// Circle: position
import MapView, { Polyline, Circle } from 'react-native-maps';
import styled from 'styled-components';

import map from '../hooks/stateManager/map/map';

const Map = () => {

  const [ currentLocation, locations ] = map();

  if(!currentLocation || !currentLocation.coords) {
    return <IndicatorObject 
      size="large"
    />
  }

  // for Testing [IMPORTANT DO NOT DELETE]
  // let points = [];
  // for(let i = 0; i < 20 ; i++) {
  //   if(i % 2 === 0) {
  //     points.push({
  //       latitude: 37.332333 + (i * 0.001),
  //       longitude: -122.03121 + (i * 0.001),
  //     })
  //   } else {
  //     points.push({
  //       latitude: 37.332333 + (-i * 0.002),
  //       longitude: -122.03121 + (-i * 0.001),
  //     })
  //   }
  // }
  // console.log(points)
  // very similar Image that has height and width
  
  return (
    <MapView 
      style={ styles.map }
      initialRegion={{
        ...currentLocation.coords,
        // only for testing
        // latitude: 37.332333,
        // longitude: -122.03121,

        // // Zoom Level
        // when the number is smaller, the map gets larger area
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      // Without Region map does not updated but circle itself will be updated and moved
      // Better not use region
      
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle 
        // cross point of lan and lon
        center={ currentLocation.coords }
        radius={ 30 }
        // border color
        strokeColor="rgba(158, 158, 255, 1.0)"
        // backgroun color
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      {/* Tracking line */}
      <Polyline 
        // only need coords field value.
        coordinates={ locations.map(location => location.coords) }
      />
    </MapView>
  )
}

// must use StyleSheet for expo - react native MapView
const styles = StyleSheet.create({
  map: {
    height: '100%',
  }
});

const IndicatorObject = styled.ActivityIndicator`
  align-self: center;
`;

export default Map;