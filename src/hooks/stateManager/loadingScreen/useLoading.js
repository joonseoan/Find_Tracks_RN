import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../../contexts/authContext/authContext';

export default () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;

}