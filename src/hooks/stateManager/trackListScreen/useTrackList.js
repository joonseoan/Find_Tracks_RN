import { useContext, useEffect } from 'react';
import { Context as TrackContext } 
  from '../../../contexts/trackContext/trackContext';

// import { NavigationEvents } from 'react-navigation';

export default navigation => {

  const { state, fetchTracks } = useContext(TrackContext);

  // [IMPORTANT ] Example of alternative of "NaviationEvents"  
  // useEffect(() => {    
  //   const sub = navigation.addListener('didFocus', async () => {
  //     await fetchTracks();
  //   });
  //     return () => { sub.remove(); }   
  // }, [])

  return {
    state,
    fetchTracks
  }
}