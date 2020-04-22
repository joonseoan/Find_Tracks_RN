import React, { useContext } from 'react';

import { 
  Context as LocationContext 
} from '../../../contexts/locationContext/locationContext';

const map = () => {
  const { state: { currentLocation, locations } } = useContext(LocationContext);
  return [ currentLocation, locations ];
};

export default map;

