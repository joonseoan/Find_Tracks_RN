import React, { useContext } from 'react';

import { 
  Context as LocationContext 
} from '../../../contexts/locationContext/locationContext';

const map = () => {
  const { state: { currentLocation } } = useContext(LocationContext);
  return [ currentLocation ];
};

export default map;

