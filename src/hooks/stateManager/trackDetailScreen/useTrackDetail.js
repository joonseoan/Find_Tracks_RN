import { useContext } from 'react';
import { Context as TrackContext } 
  from '../../../contexts/trackContext/trackContext';

export default id => {

  const { state } = useContext(TrackContext);

  const track = state.find(track => (track.id === id));
  
  return {
    track
  };
}