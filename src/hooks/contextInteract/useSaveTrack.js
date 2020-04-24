import { useContext } from 'react';
import { Context as TrackContext } from '../../contexts/trackContext/trackContext';
import { Context as LocationContext } from '../../contexts/locationContext/locationContext';

export default () => {

  const { createTracks } = useContext(TrackContext);
  const { state: { name, locations }} = useContext(LocationContext);

  const saveTracks = () => {
    createTracks(name, locations);
  }

  return [ saveTracks ];

}

