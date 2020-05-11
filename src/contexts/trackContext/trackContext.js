import createDataContext from '../createDataContext';
import apolloClient from '../../graphql';
import createTrack from '../../graphql/mutations/trackCreate';

const TrackReducer = (state, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

const fetchTracks = dispatch => () => {};
const createTracks = dispatch => async (name, locationList) => {
  try {

    const locations = locationList.map(location => {  
      const { 
        accuracy, altitude, heading, 
        latitude, longitude, speed, 
        altitudeAccuracy 
      } = location.coords;

      console.log(typeof location.timestamp)
      const num = 1000000;  
      return { 
        coords: { 
          accuracy,
          altitude,
          heading,
          latitude,
          longitude,
          speed,
          altitudeAccuracy
        },
        // timestamp: location.timestamp.toString()
        timestamp: "1000000"
      }
    });
    
    console.log('locations: ', locations)
    const { data } = await apolloClient.mutate({
      mutation: createTrack,
      variables: { data: { name, locations }}
    })

    console.log('data: ', data)
    
  } catch(e) {
    throw new Error(e)
  }
};


export const { Context, Provider } = createDataContext(
  TrackReducer,
  { fetchTracks, createTracks },
  []
);