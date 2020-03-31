import createDataContext from '../createDataContext';

const locationReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'START_RECORDING':
      return { ...state, recording: true };
    case 'STOP_RECORDING':
      return { ...state, recording: false };
    case 'ADD_LOCATION':
      return { ...state, locations: [ ...state.locations, action.payload ]}
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

const changeName = dispatch => name => {
  dispatch({ type: 'CHANGE_NAME', payload: name });
}

const startRecording = dispatch => () => {
  dispatch({ type: 'START_RECORDING' });
}

const stopRecording = dispatch => () => {
  dispatch({ type: 'STOP_RECORDING' });
}

// "recording:" get another state from the components, not directly from the state value
const addLocation = dispatch => (location, recording) => {
  console.log('adbdedef')
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
  // location: only from the moment of "recording is true"
  if(recording) {
    dispatch({ type: 'ADD_LOCATION', payload: location });
  }
} 

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName },
  { name: '', recording: false, locations: [], currentLocation: null }
);

