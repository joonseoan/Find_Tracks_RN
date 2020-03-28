// only for testing!
// It is only way to test location for both ios and android

import * as Location from 'expo-location';

// [ INPORTANT Away to get Location in Expo ]
// const getPosition = Location.getCurrentPositionAsync({})
//     .then(location => {
//       return location;
//     })
  //   if(aaa) {
  //     return resolve(aaa)
  //   } else {
  //     return reject('Failed')
  //   }
  //   // .then(location => {
  //   //   return location;
  //   // })
  // })


// const add = getPosition()
//   .then(ddd => {
//     console.log('ddddd: ',ddd)
//     return ddd;
//   })

  // console.log('add: ', getPosition)


// const abc = (async () => {
//   return await Location.getCurrentPositionAsync({});
// })()

// const ccc = (() => { 
//   const ddd = abc;
//   console.log('ddd: ', ddd)
//   return ddd;
// })()


// console.log('getCurrentPosition:', ccc)

// fake location reading...
const tenMeterWithDegrees = 0.0001;
const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      // testing initial value + moving speed.
      longitude: -79.3993 + increment * tenMeterWithDegrees, // should be set from the current location.
      latitude: 43.6867 + increment * tenMeterWithDegrees
    }
  }
}

// entering info to Location class
let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000)