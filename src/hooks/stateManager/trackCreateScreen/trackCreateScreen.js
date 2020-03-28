import '../../../_mock_location';
import React, { useEffect, useState, useContext } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { 
  Context as LocationContext 
} from '../../../contexts/locationContext/locationContext';

const trackCreateScreen = isFocused => {
  
  const [ error, setError ] = useState(null);
  const [ subscriber, setSubscriber ] = useState(null);
  const { addLocation } = useContext(LocationContext);

  const startWatching = async () => {
    try {
      // every time before tracking start
      // setup null
      setError(null);
      // request permission
      await requestPermissionsAsync();

      // 2)
      // when we disable the tracking
      const sub = await watchPositionAsync({
       // 1)
      // await watchPositionAsync({
        // accuracy option
        accuracy: Accuracy.BestForNavigation,
        // every 1 sec or every 10 meter, either of them below
        timeInterval: 1000,
        distanceInterval: 10,
      }, location => {

        // "location" is from initial value from "watchPositionAsync" of "expo-location"
        // keep adding locations from the current location
        addLocation(location);

        // For testing with "_mock_location.js"
        // [ IMPORTANT : WE CAN PRINT OUT THE MOCK UP TEST HERE
        //    because LOCATION IS A CLASS AND INSTANCE BASE    ]
        // update location every sec even though we setup 10 meter or 1sec.
        // console.log(location)
      });
      
      // [ IMPORTANT !!!!!!!!!] THE WAY OF GETTING THE VALUE INSIDE OF LIB
      // Then, we get this value to useState to control it
      setSubscriber(sub);
      
      // [ INPORTANT !!!!!!!!!!!!!!!!!!]
      // [ It works at once because it is variable from the child ===> need to move useEffect]
      // disabling tracking the map!
      // it is from "await watchPositionAsync" above
      // console.log('isFocused in context: ', isFocused)
      // if(!isFocused) {
      //   console.log('afadfisFocused: ')
      //   subscriber.remove();
      // }

    } catch(e) {      
      setError(e.message)
    }
  }

  useEffect(()=> {

    if(isFocused) {
      startWatching();
    } else {
      // disabling tracking data abvoe.
      subscriber.remove();
      //back to default null value.
      setSubscriber(null);
    }

    // [ IMPORTANT]
  // isFocused can be inside of arrray of useEffect
  // even though it is props of not props, not state.of react.
  // It is react-navigation
  }, [ isFocused ]);

  return [ error ];
}

export default trackCreateScreen;