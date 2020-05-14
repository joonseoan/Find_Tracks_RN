import { useContext } from 'react';
import { Context as TrackContext } from '../../contexts/trackContext/trackContext';
import { Context as LocationContext } from '../../contexts/locationContext/locationContext';
import { navigate } from '../../navigationRef';

export default () => {

  const { createTracks, fetchTracks } = useContext(TrackContext);
  const { state: { name, locations }, reset } = useContext(LocationContext);

  const saveTracks = async () => {
    await createTracks(name, locations);
    await fetchTracks();
    // reset name
    // hide "save button" because of "!(!recording && locations.length)"
    reset();

    navigate('TrackList');
  }

  return [ saveTracks ];

}

