import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_KEY } from 'react-native-dotenv'; 
import createDataContext from '../createDataContext';
import apolloClient from '../../graphql';
import user_signup from '../../graphql/mutations/userSignup';
import user_signin from '../../graphql/mutations/userSignin';
import { navigate } from '../../navigationRef';

const authReducer = (state, action) => {
  switch(action.type) {
    case 'SIGNUP':
      return { ...state, ...action.payload, errorMessage: '' };
    case 'SIGNIN':
      return { ...state, ...action.payload, errorMessage: '' };
    case 'LOCAL_LOGIN':
      return { ...state, token: action.payload };
    case 'SIGN_OUT':
      return { ...state, token: null, errorMessage: '' };
    case 'ADD_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
}

const tryLocalSignIn = dispatch => async () => {
  try {
    
    // Development Logout
    // await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
    // await apolloClient.resetStore();

    const storedField = await SecureStore.getItemAsync(SECURE_STORE_KEY);
    const jsonToken = JSON.parse(storedField);
    if(jsonToken) {
      dispatch({ type: 'LOCAL_LOGIN', payload: jsonToken.token });
      navigate('TrackList');
    } else {
      navigate('Auth');
    }
  } catch(e) {
    dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Something is wrong with Local Login' })
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE' });
}

const signup = dispatch => async userInputs => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: user_signup,
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
    dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Something is wrong with Signup'});
  }
}

const signin = dispatch => async userInputs => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: user_signin,
      variables: userInputs
    })

    if(!data) {
      throw new Error('Unable to post your login data.');
    }

    const tokenEncryption = JSON.stringify({ token: data.loginUser.token });
    await SecureStore.setItemAsync(SECURE_STORE_KEY, tokenEncryption);
    
    dispatch({ type: 'SIGNIN', payload: data.loginUser });
    navigate('TrackList');
  } catch(e) {
    dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Something is wrong with Signin' });
  }
}

const signout = dispatch => async () => {
    try {
      await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
      await apolloClient.resetStore();
      dispatch({ type: 'SIGN_OUT' });
      navigate('Auth');
    } catch(e) {
      dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Something is wrong with Signout' });
    }  
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: '' }
);