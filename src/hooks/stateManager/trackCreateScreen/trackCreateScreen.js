import '../../../_mock_location';
import React, { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

const trackCreateScreen = () => {
  
  const [ error, setError ] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync({
        // accuracy option
        accuracy: Accuracy.BestForNavigation,
        // every 1 sec or every 10 meter, either of them below
        timeInterval: 1000,
        distanceInterval: 10,
      }, location => {
        console.log(location)
      });
    } catch(e) {
      setError(e)
    }
  }

  useEffect(()=> {
    startWatching();
  }, []);

  return [ error ];
}

export default trackCreateScreen;