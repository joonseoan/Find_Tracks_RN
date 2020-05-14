// [ IMPORTANT ]
// if we want to get real data of real time current location,
//  jut comment out
import '../../../_mock_location';

import { useEffect, useState, useContext } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { 
  Context as LocationContext 
} from '../../../contexts/locationContext/locationContext';

const trackCreateScreen = isFocused => { 
  
  const { 
    state, addLocation, startRecording, 
    stopRecording, changeName, reset 
  } = useContext(LocationContext);

  const [ error, setError ] = useState(null);

  // It is before startWatching going inside useEffect
  // Do not need to be defined since "startWatching is going inside of useEffect"
  // const [ subscriber, setSubscriber ] = useState(null);

  // const startWatching = async () => {
  //   try {
  //     // every time before tracking start
  //     // setup null
  //     setError(null);
  //     // request permission
  //     await requestPermissionsAsync();

  //     // 2)
  //     // when we disable the tracking
  //     const sub = await watchPositionAsync({
  //     // 1)
  //     // await watchPositionAsync({
  //       // accuracy option
  //       accuracy: Accuracy.BestForNavigation,
  //       // every 1 sec or every 10 meter, either of them below
  //       timeInterval: 1000,
  //       distanceInterval: 10,
  //     }, location => {

  //       // "location" is from initial value from "watchPositionAsync" of "expo-location"
  //       // keep adding locations from the current location
  //       addLocation(location, state.recording);

  //       // For testing with "_mock_location.js"
  //       // [ IMPORTANT : WE CAN PRINT OUT THE MOCK UP TEST HERE
  //       //    because LOCATION IS A CLASS AND INSTANCE BASE    ]
  //       // update location every sec even though we setup 10 meter or 1sec.
  //       // console.log(location)
  //     });
      
  //     // [ IMPORTANT !!!!!!!!!] THE WAY OF GETTING THE VALUE INSIDE OF LIB
  //     // Then, we get this value to useState to control it
  //     // sub => object
  //     // console.log('sub: ', sub) // only remove method.
  //     await setSubscriber(sub);
      
  //     // [ INPORTANT !!!!!!!!!!!!!!!!!!]
  //     // [ It works at once because it is variable from the child ===> need to move useEffect]
  //     // disabling tracking the map!
  //     // it is from "await watchPositionAsync" above
  //     // console.log('isFocused in context: ', isFocused)
  //     // if(!isFocused) {
  //     //   console.log('afadfisFocused: ')
  //     //   subscriber.remove();
  //     // }

  //   } catch(e) {      
  //     setError(e.message)
  //   }
  // }

  useEffect(()=> {
    // 6) Need to look at
    // Last one in this component!!! haha
    // When we write values from useContext, props, useState,
    // Those valaues should be watched in the array which is secon arg in useEffect.

    // Also, it is not good way to write values above in helper function.
    // They should be written inside of useEffect function and then watched in the array.
    // Do Not call outside helper function here in useEffect!
    let subscriber;
    const { recording } = state;
    // start watching comming inside because "state.recording" should be watched in the array
    const startWatching = async () => {
      try {
        setError(null);
        await requestPermissionsAsync();  
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        }, location => {

          addLocation(location, recording);
        });

        if(!subscriber) {
          throw new Error('Unable to get subscriber method.');
        }
  
      } catch(e) {      
        setError(e.message)
      }
    }    

    if(isFocused || recording) {
      // whenever isFocused, start from the current user position
      (async () => {
        await startWatching();
      })();

    } else {

      // [ONLY WHEN STAY AWAY THIS COMPONENT] === !isFocused && !recording
      // disabling tracking data abvoe.
      // subscriber only includes "remove()" methods.
      if(subscriber) {
        subscriber.remove();
      }
      //back to default null value.
      subscriber = null;
      // 1) before startWatching coming inside of useEffect
      // setSubscriber(null)//
    }

    // [ ONLY WHEN RESTART USEEFFECT WITH SAME "STARTWATCHING()"]
    // because as "state.recording" changes
    //  this useEffect invokes "startWatching()" twice.
    //  frist : isFocused ==> true
    //  second: state.recording ==> true
    // Since it is async, startWatching will keep invoked twice...==> issue

    // SOLUTION
    // This query function is invoked inside of useEffect library
    // To do something with the current process inside of UseEffect.
    // At current useEffect, it can be invoked to stop the current process "startWatch function."
    // Then restart new useEffect function.
    return () => {
      if(subscriber) {
        subscriber.remove();
      }
    }

    // [ IMPORTANT]
    // isFocused can be inside of arrray of useEffect
    // even though it is props of not props, not state.of react.
    // It is react-navigation
  }, [ isFocused, state.recording ]);

  return {
    error, 
    state, 
    addLocation, 
    startRecording, 
    stopRecording, 
    changeName,
    reset
  };
}

export default trackCreateScreen;

// useCallback!
// Must review over and over
  /*
    NOT RELATED TO THIS CODE
    BUT BASIC JAVASCRIPT.

    const AnotherCompo = props => {
      const [ state, setState ] = useState('');

      App(isFocused,(location) => {
        // in this case ===> state valuse is always === '' which is default value.
        // Javascript just handles default value in closure
        // Even though we updated sate value by uinsg like setState('John')
        anotherfunction(location, state) 
      })  
    }

    const App = ( isFocused, callback ) => {
      // 1) Issue
      useEffect(() => {
        
        (async () => {
          await startWatching();
        })();
  
        // [ IMPORTANT ]
        // "callback" does not have name. It is anonymous
        //    which means every time hooks receives "callback"
        //    it is a different "callback" (I am not sure about normal function but I guess it is a same fuction)
        // So "useEffects", invoked over and over to maxInvokedError.
  
        // The elements in this array must be stable before some event occurs.
      }, [ isFocused, callback]) // callback does not have name.    
    }
    
    // Solution!

    import React, { useCallback } form 'react';
    
    const AnotherCompo = props => {
      const [ state, setState ] = useState('');
      const callback = useCallback((location) => {
        anotherfunction(location, state) 
      }. [ state.recording ]) // same thing in useEffect

      App(isFocused, callback)  
    }
    Please refer to iamge "useCallback!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1"
    const App = (isFocused, callback) => {
      (async () => {
          await startWatching();
        })();
          // WHENVER CHANGE "state.recording" above
          // callback state is changed otherwise, it is same callback
      }, [ isFocused, callback])
    }

    // 3) Just FYI, should notice!!!!!!!!!!!!!!!!!!!!!!!
    // [IMPORTANT]
    withouth array, it can be used only when the JSX rerenders from some event!!!!
    // That event should not be automatic and iterable event!
    useEffect(() => {}) 
  */