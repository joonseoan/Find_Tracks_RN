import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_KEY } from 'react-native-dotenv'; 
import createDataContext from '../createDataContext';
import apolloClient from '../../graphql';
import userSignup from '../../graphql/mutations/userSignup';
import userSignin from '../../graphql/mutations/userSignin';
import { navigate } from '../../navigationRef';

const authReducer = (state, action) => {
  switch(action.type) {
    case 'SIGNUP':
      return { ...state, ...action.payload, errorMessage: '' };
    case 'SIGNIN':
      return { ...state, ...action.payload, errorMessage: '' };
    case 'ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

const signup = dispatch => {
  return async userInputs => {
    try {

      const { data } = await apolloClient.mutate({
        mutation: userSignup,
        variables: userInputs
      })

      if(!data) {
        throw new Error('Unable to post your signup data.');
      }

      const tokenEncryption = JSON.stringify({ token: data.createUser.token });
      await SecureStore.setItemAsync(SECURE_STORE_KEY, tokenEncryption);

      dispatch({ type: 'SIGNUP', payload: data.createUser });
      navigate('TrackList');
    } catch(e) {
      dispatch({ type: 'ERROR_MESSAGE', payload: 'Something is wrong with Signup'});
    }
  }
}

const signin = dispatch => {
  return async userInputs => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: userSignin,
        variables: userInputs
      })

      if(!data) {
        throw new Error('Unable to post your login data.');
      }
      dispatch({ type: 'SIGNIN', payload: data.loginUser });
    } catch(e) {
      dispatch({ type: 'ERROR_MESSAGE', payload: 'Something is wrong with Signin'});
      throw new Error(e.response.data);
    }
  }
}

const signout = dispatch => {
  return;
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin },
  { token: null, errorMessage: '' }
);