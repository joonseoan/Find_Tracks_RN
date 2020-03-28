import '../../../_mock_location';
import React, { useEffect, useState, useContext } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { 
  Context as LocationContext 
} from '../../../contexts/locationContext/locationContext';

const trackCreateScreen = isFocused => {
  
  const [ error, setError ] = useState(null);
  const { addLocation } = useContext(LocationContext);

  const startWatching = async () => {
    try {
      // request permission
      await requestPermissionsAsync();

      // 2)
      // when we disable the tracking
      const subscriber = await watchPositionAsync({
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
      // disabling tracking the map!
      // it is from "await watchPositionAsync" above
      console.log('isFocused in context: ', isFocused)
      if(!isFocused) {
        console.log('afadfisFocused: ')
        subscriber.remove();
      }

      setError(null);

    } catch(e) {      
      setError(e.message)
    }
  }

  useEffect(()=> {
    startWatching();
  }, []);

  return [ error ];
}

export default trackCreateScreen;