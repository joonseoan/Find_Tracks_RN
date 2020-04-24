import createDataContext from '../createDataContext';

const TrackReducer = (state, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

const fetchTracks = dispatch => () => {};
const createTracks = dispatch => (name, locations) => {

  console.log('name: ', name)
  console.log('locations: ', locations)

};


export const { Context, Provider } = createDataContext(
  TrackReducer,
  { fetchTracks, createTracks },
  []
);