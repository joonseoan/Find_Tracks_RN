import createDataContext from '../createDataContext';
import apolloClient from '../../graphql';
import create_track from '../../graphql/mutations/trackCreate';
import fetch_track from '../../graphql/queries/getTracks';

const TrackReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_TRACK':
      return [ ...action.payload ]; 
    default:
      return state;
  }
}

const fetchTracks = dispatch => async () => {
  try {
    const { data } = await apolloClient.query({
      query: fetch_track
    });

    if(!data) {
      throw new Error('Failed to get your track data.'); 
    }

    dispatch({ type: 'FETCH_TRACK', payload: data.fetchTrack });

  } catch(e) {
    throw new Error(e);
  }
};

const createTracks = dispatch => async (name, locationList) => {
  try {

    const locations = locationList.map(location => {

      const { 
        accuracy, altitude, heading, 
        latitude, longitude, speed, 
        altitudeAccuracy 
      } = location.coords;

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
        timestamp: location.timestamp !== 10000000 ? "10000000" : location.timestamp.toString()
      }
    });
    
    /***********
     * 
     * 2) IMPORTANT FOR APOLLO CLIENT CACHE MANAGEMENT
     * 
     ***********/
    // Apollo Client Recommendation when add new entities and fully update multiple fields
    // https://scotch.io/tutorials/realtime-graphql-ui-updates-in-react-with-apollo  ==> !!!!!!!!!!
    // Please find Optimistic response and subscription!!!!!!!!!!!!!!!!!1

    // // [ IMPORTANT ]
    await apolloClient.mutate({
      // create_track: variable!
      mutation: create_track,
      variables: { data: { name, locations }},
      // createTrack: mutation name
      update: (cache, { data: { createTrack }}) => {
        // fetchTrack: query name
        // fetch_track: variable name
        const { fetchTrack } = cache.readQuery({ query: fetch_track });
        cache.writeQuery({
          query: fetch_track,
          // createTrack: mutation name
          data: { fetchTrack: fetchTrack.concat([ createTrack ])}
        });
      }  
    });

    // [IMPORTANT : A way of cache update after mutation ]
    // It is also working in client level in action
    
    // [ IMPORTANT ]
    // 1)
    // await apolloClient.mutate({
    //   mutation: create_track,
    //   variables: { data: { name, locations }},
    //   refetchQueries: () => [{ query: fetch_track }],
    //   awaitRefetchQueries: true
    // });

  } catch(e) {
    throw new Error(e)
  }
};

export const { Context, Provider } = createDataContext(
  TrackReducer,
  { fetchTracks, createTracks },
  []
);